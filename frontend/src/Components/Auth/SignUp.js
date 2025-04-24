import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    

    const navigate = useNavigate()

     useEffect(() => {
    
            const auth = localStorage.getItem('token')
    
            if(auth)
            {
                navigate('/products')
            }
        },[])
    
  
    

    const collectData = async() => {

        let result = await fetch("http://127.0.0.1:5500/register", {
            method: 'POST',
            body: JSON.stringify({name,email,password}),
            headers:{
                'Content-Type' : 'application/json'
            },

        })

        result = await result.json()
        

        if(result)
        {
            localStorage.setItem('user',JSON.stringify(result.result))
            localStorage.setItem('token',JSON.stringify(result.auth))
            navigate('/products')

        }
        
        
    }

    return(
        <div className='register'>
            <h1>
                Register
            </h1>

            <input className = 'input-box' type='text' onChange = {(e) => setName(e.target.value)} placeholder='Enter Name' />
            <input className = 'input-box' type='text' onChange = {(e) => setEmail(e.target.value)} placeholder='Enter Email' />
            <input className = 'input-box' type='password' onChange = {(e) => setPassword(e.target.value)} placeholder='Enter Password' />
            <button className = 'register-btn' onClick = {() => {collectData()}}type='button'>Sign Up</button>
        </div>
    )
}

export default SignUp