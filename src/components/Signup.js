import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email:"", password: ""});
    let history = useHistory();
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const {name,email,password} = credentials
        const response = await fetch("http://localhost:8000/api/auth/register", {
            
            method: "POST", // *GET, POST, PUT, DELETE, etc.
           
            headers: {
              "Content-Type": "application/json"

            },
           
            body: JSON.stringify({name,email,password})
          });
          const json = await response.json();
          console.log(json)
          if(json.success)
          {
            //redirect
            //Save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            history.push("/");
          }
          else
          {
            alert("Email already registered");
          }
    }
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
    return (
        <form onSubmit={handleSubmit}>
             <div className="mb-3">
                <label for="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
                    
            </div>
            <div className="mb-3">
                <label for="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp"name="email" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange}/>
            </div>
          
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Signup