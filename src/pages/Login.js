import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../style.scss'
import { AuthContext } from '../context/authContext';


const Login = () => {
    const [err,setError]=useState(null)
    const navigate =useNavigate()
    const{ login} =useContext(AuthContext)

    const [inputs, setInput]=useState({
        username:"",
        password:""
    })
    const handleChange =(e)=>{
        setInput(prev=>({...prev,[e.target.name]:e.target.value}))

    }

    const handleSubmit =async e =>{
        e.preventDefault()
       try{
         await login(inputs)
        await axios.post("/auth/login",inputs)
        navigate("/")
       
     
       }catch(err){
          setError(err.response.data)
       }
        
        


    }
    
    return (
        <div className='auth'>
            <h1>Please Login</h1>
            <form >
             <input required type="text" name='username' placeholder='userName' onChange={handleChange} />
             <input required type="password" name='password' placeholder='password' onChange={handleChange} />
             <button onClick={handleSubmit}>Login</button>
             {err && <p>{err}</p>} 
             <span>Don't have a account?<Link to="/register">Register</Link></span>
            </form>
        </div>
    );
};

export default Login;