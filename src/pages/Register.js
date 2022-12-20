import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../style.scss'


const Register = () => {
    const [err,setError]=useState(null)
    const navigate =useNavigate()
    const [inputs, setInput]=useState({
        username:"",
        email:"",
        password:""
    })
    const handleChange =(e)=>{
        setInput(prev=>({...prev,[e.target.name]:e.target.value}))

    }

    const handleSubmit =async e =>{
        e.preventDefault()
       try{
        await axios.post("/auth/register",inputs)
        navigate("/login")
       
     
       }catch(err){
          setError(err.response.data)
       }
        
        


    }
    
    return (
        <div className='auth'>
            <h1>Please Register</h1>
            <form >
             <input required type="text" placeholder='userName' name='username' onChange={handleChange} />
             <input required type="email" placeholder='email' name='email' onChange={handleChange} />
             <input required type="password" placeholder='password' name='password' onChange={handleChange} />
             <button onClick={handleSubmit}>Register</button>
              {err && <p>{err}</p>} 
             <span>Do you have a account?<Link to="/login">Login</Link></span>
            </form>
        </div>
    );
};

export default Register;