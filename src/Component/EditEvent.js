import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { database } from '../config/firebaseConfig';

import "./Modal.css"

function EditEvent({ ourevent }) {
    const [eventName, seteventName] = useState(ourevent.eventName)
    const [eventVenue,seteventVenue]=useState(ourevent.eventVenue)
    const [eventDate,seteventDate]=useState(ourevent.eventDate)
    const [totalAttendees,settotalAttendees]=useState(ourevent.totalAttendees)
    const [regularTicket,setregularTicket]=useState(ourevent.regularTicket)
    const [vipTicket, setvipTicket] = useState(ourevent.vipTicket)

    const id = ourevent.id
    // eventName, eventVenue, eventDate, totalAttendees, regularTicket, vipTicket
    const docRef = doc(database, "event", id);
    const editEvent = async (e ) => {
        // e.preventDefault()

        await updateDoc(docRef, {
            eventName: eventName,
            eventVenue: eventVenue,
            eventDate: eventDate,
            totalAttendees: totalAttendees,
            regularTicket: regularTicket,
            vipTicket: vipTicket,
        })
    }
    
    return (
        <div>
            <h2>Edit Event</h2>
                
            <form onSubmit={() => { editEvent()}}>
                    <div className="input-container">
                        <label >Event Name:</label>
                    <input type="type" value={eventName} onChange={(e)=>seteventName(e.target.value)} required/>
                    </div>
                    <div className="input-container">
                        <label >Event Venue:</label>
                        <input type="type" value={eventVenue} onChange={(e)=>seteventVenue(e.target.value)} required/>
                    </div>
                    <div className="input-container">
                        <label >Event Date:</label>
                        <input type="date" value={eventDate} onChange={(e)=>{seteventDate(e.target.value)}} required/>
                    </div>
                    <div className="input-container">
                        <label >Total number of attendees:</label>
                    <input type="number" value={totalAttendees} onChange={(e) => { settotalAttendees(e.target.value)}} required/>
                    </div>
                    <div className="input-container">
                        <label >Regular Ticket Prices:</label>
                        <input type="number" value={regularTicket} onChange={(e)=>{setregularTicket(e.target.value)}} required/>
                    </div>
                    <div className="input-container">
                        <label >VIP Ticket Prices:</label>
                        <input type="number" value={vipTicket} onChange={(e)=>{setvipTicket(e.target.value)}} required/>
                    </div>
                    <button type="submit" className="apps-btn">Edit</button>
                </form>      
        </div>
    )
}

export default EditEvent



