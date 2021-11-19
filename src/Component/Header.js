import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { auth } from '../config/firebaseConfig'
import { onAuthStateChanged,signOut } from '@firebase/auth'
import "../App.css"

function Header() {
    const [adminVisible, setAdminVisible] = useState(false)
    const[error,setError]=useState("")
    const navigate =useNavigate()

    onAuthStateChanged(auth, (user) => {
        if (user.email === "admin@gmail.com") {
            setAdminVisible(true)
        } 
    })
    const signout = () => {
        signOut(auth).then(() => {
            navigate("/")
        }).catch((error) => {
            setError(error)
        });
    } 
    return (
        <div className="header-container">
            <h1>Churchill Show</h1>
            <div >
                {adminVisible && <div className="apps-btn">
                    <Link to="/admin" className="links">Admin</Link>
                </div>}
            </div>
            <button onClick={signout} className="apps-btn">Log Out</button>
        </div>
    )
}

export default Header
