const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/notebook";

const connectToMongo = async() => {
   await mongoose.connect(mongoURI,()=>{
      console.log("connected to mongo Successfully");
   })   
 }
module.exports = connectToMongo;