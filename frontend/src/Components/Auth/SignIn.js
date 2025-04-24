import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignIn = () => {


    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    useEffect(() => {
        let auth = localStorage.getItem('user')
        if(auth)
        {
            navigate('/products')
        }
    },[])


    const verifyData = async() => {

        

        let result = await fetch("http://127.0.0.1:5500/login",{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type' : 'application/json'
            },
        })

        result =  await result.json();
        

        if(result.auth)
        {

            localStorage.setItem('user',JSON.stringify(result.user))
            localStorage.setItem('token',JSON.stringify(result.auth))
            navigate('/products')
        }

        else{
            alert('Wrong Credentials')
        }
    }


    return(
        <div className='login'>
            <h1>
                Login
            </h1>

            
            <input className = 'input-box' type='text' onChange = {(e) => setEmail(e.target.value)} placeholder='Enter Email' />
            <input className = 'input-box' type='password' onChange = {(e) => setPassword(e.target.value)} placeholder='Enter Password' />
            <button className = 'login-btn' onClick = {() => {verifyData()}}type='button'>Sign In</button>
        </div>
    )
}

export default SignIn