import React, { useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { database } from '../config/firebaseConfig'
import { collection, addDoc } from '@firebase/firestore'
import "../App.css"

function Event() {
    const [eventName,setEventName]=useState("")
    const [eventVenue,setEventVenue]=useState("")
    const [eventDate,setEventDate]=useState(Date.now())
    const [totalAttendees,setTotalAttendees]=useState(0)
    const [regularTicket,setRegularTicket]=useState(0)
    const [vipTicket, setVipTicket] = useState(0)
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    
    const addEvent = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await addDoc(collection(database, "event"), {
                eventName: eventName,
                eventVenue: eventVenue,
                eventDate: eventDate,
                totalAttendees: totalAttendees,
                regularTicket: regularTicket,
                vipTicket: vipTicket,
            })
            navigate("/admin")
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
            setError("Could not add the event. Ensure you have good internet connection and try again")
        }
    }
    return (
        <center>
            <h1>Add an Event</h1>
            {error && <h4 style={{color: "red"}}>{ error}</h4>}

            <form className="form-container" onSubmit={addEvent }>
                <div className="input-container">
                    <label >Event Name:</label>
                    <input type="type" onChange={e => { setEventName( e.target.value )}} required/>
                </div>
                <div className="input-container">
                    <label >Event Venue:</label>
                    <input type="type" onChange={e => { setEventVenue(e.target.value) }} required />
                </div>
                <div className="input-container">
                    <label >Event Date:</label>
                    <input type="date" onChange={e => { setEventDate(e.target.value)}}required />
                </div>
                <div className="input-container">
                    <label >Total number of attendees:</label>
                    <input type="number" onChange={e => { setTotalAttendees( e.target.value)}} required />
                </div>
                <div className="input-container">
                    <label >Regular Ticket Prices:</label>
                    <input type="number" onChange={e => { setRegularTicket( e.target.value)}} required />
                </div>
                <div className="input-container">
                    <label >VIP Ticket Prices:</label>
                    <input type="number" onChange={e => { setVipTicket(e.target.value)}} required />
                </div>
                <button type="submit" className="apps-btn" disabled={ loading}>Submit</button>
            </form>
            <div className="apps-btn"><Link to="/admin" className="links" disabled={ loading}>Back To Dashboard</Link></div>
        </center>
    )
}

export default Event
