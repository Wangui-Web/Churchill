import React, { useState} from 'react'
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged } from '@firebase/auth';
import emailjs from "emailjs-com"
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import "../App.css"

function Payment() {
    const [successMsg,setSuccessMsg]=useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate =useNavigate()
    const handleSubmit = (e) => {
        
        e.preventDefault()
        setLoading(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email)
                emailjs.sendForm('service_gp3yoj2', "template_q9ma674", e.target, "user_ic3Gm8vjl5jUfFESHQeGb")
                .then(() => {
                    setSuccessMsg("An success email has been sent to your email")
                    setLoading(false)
                    setTimeout(() => {
                        navigate("/home")
                    }, 5000)
                })
                .catch((error) => {
                    setLoading(false)
                    setSuccessMsg("This is not your email!!")
                })
            }
        })
    }

    return (
       
        <div className="payment-container">
            <h1>Payment</h1>
            <h4 style={{ color: 'red' }}>Do not enter your credit card information. This is for development purposes.</h4>

            {loading && (
                <div className="loader">
                    <ClipLoader loading={loading} size={50} />
                </div>
            )}

            {successMsg && <h3>{successMsg}</h3>}
            <form onSubmit={handleSubmit} className="form-container">
                <div className="input-container">
                    <label>Enter your card number:</label>
                    <input type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" autoComplete="cc-number" maxLength="19" placeholder="xxxx xxxx xxxx xxxx" />
                </div>
                <div className="input-container">
                    <label>Confirm your email and proceed to pay</label>
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <button type="submit" className="apps-btn" disabled={ loading}> Pay</button>
            </form>
             <button className="apps-btn" >
            <Link to="/home">Back Home</Link>
            </button>
            </div>
         
    )
}

export default Payment
