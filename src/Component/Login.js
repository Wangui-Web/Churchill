import React, { useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { auth } from "../config/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth";
import { ClipLoader } from 'react-spinners';

function Login() {
    const [email,setEmail]=useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user) {
                setLoading(false)
                navigate("/home")
            }
        })
        .catch((error) => {
        setLoading(false)
        setError("Email does not match with respective password. Try again. If you do not have an account register.")
        });
    }
    return (
        <center>
            <h1>Churchill Show</h1>
            <h2>Login</h2>
            {error && <h4 style={{color: "red"}}>{ error}</h4>}
            {loading && (
                <div className="loader">
                    <ClipLoader loading={loading} size={50} />
                </div>
            )}  
            <form className="form-container" onSubmit={ handleSubmit}>
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
            <h2>No Account? <Link to="/register">Register Here</Link></h2>
        </center>
    )
}

export default Login
