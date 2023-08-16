const express = require('express');
const router= express.Router();
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');

var jwt= require('jsonwebtoken');
const User = require("../models/user");
const JWT_SECRET= "shhhhh";
var fetchuser = require("../middleware/fetchUser");


//Route 1
// Create a user 
// POST "api/auth/register"


router.post('/register',[
    body('name','Enter a valid Name').isLength({min:3}),
    body('email','Enter valid Email').isEmail(),
    body('password').isLength({min:5})

],async (req,res)=>{
    const errors = validationResult(req);
    let success=false;
    if(!errors.isEmpty())
    {
        return res.status(400).json({success,errors: errors.array()});
    }

    //Check for Multiple Users
    let user = await User.findOne({email: req.body.email});
    if(user)
    {
        return res.status(400).json({success,error: "Email is already registered!!"});
    }

    //creating user

    const salt= await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    

     user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
    })

    
    const data= {
        user:{
            id: user.id
        }
    }
    
    //creating JWT for authorization
    success=true;
    const authToken = jwt.sign(data,JWT_SECRET);
    
    

    res.send({success,authToken})
});





//Route 2
// Authenticate a user 
// POST "api/auth/login"

router.post('/login',[
    body('email','Enter valid Email').isEmail(),
    body('password','Password can not be blank').exists(),

],async (req,res)=>{

    const errors = validationResult(req);
    let success=false;
    if(!errors.isEmpty())
    {
        return res.status(400).json({success,errors: errors.array()});
    }

    //destructuring email and password
    const {email,password}=req.body;

    try {
        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({success,error: "Invalid credentials"});
        }

        const passwordCompare = await bcrypt.compare(password,user.password);

        if(!passwordCompare)
        {
            return res.status(400).json({success,error: "Invalid credentials"});
        }

        
        const data= {
            user:{
                id: user.id
            }
        }
        success=true;
        const authToken = jwt.sign(data,JWT_SECRET);
        res.json({success,authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error occured");
    }




})




//Route 3
// Get looged in user details 
// POST "api/auth/getuser"
//Login required

router.post('/getuser',fetchuser,async (req,res)=>{
        try {
            const userId=req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send(user);
            
        } catch (error) {
            console.log(error.message);
                res.status(500).json("Server error occured");
        }

})
module.exports = router