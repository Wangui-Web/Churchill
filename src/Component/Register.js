import React, { useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { auth } from "../config/firebaseConfig"
import {createUserWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password, setPassword] = useState("")
    const [error,setError]=useState("")
    
    let navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setName(user.displayName)
            navigate("/")
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            setError("Email already in use. If you have an account log in")
        });
        setName("")
        setEmail("")
        setPassword("")
    }
    return (
        <center>
            <h1>Churchill Show</h1>
            <h2>Create an Account</h2>
            {error && <h4 style={{color: "red"}}>{ error}</h4>}
            <form className="form-container" onSubmit={ handleSubmit}>
                <div className="input-container">
                    <label >User Name:</label>
                    <input type="text" value={name} onChange={ e=>setName(e.target.value)} required />
                </div>
                <div className="input-container">
                    <label >Email:</label>
                    <input type="email" value={email} onChange={ e=>setEmail(e.target.value)} required/>
                </div>
                <div className="input-container">
                    <label >Password:</label>
                    <input type="password" value={password} onChange={ e=>setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="apps-btn">Submit</button>
            </form>
            <h2>Already have an account? <Link to="/">Log in here</Link> </h2>
        </center>
    )
}

export default Login
