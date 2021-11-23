import React, { useState, useEffect} from 'react'
import { Link,useNavigate} from "react-router-dom"
import { auth,database } from '../config/firebaseConfig';
import { signOut } from "firebase/auth";
import { getDocs, collection, doc, deleteDoc } from '@firebase/firestore';
import EditEvent from './EditEvent';
import { ClipLoader } from 'react-spinners';
import "../App.css"
import "./Modal.css"

function Admin() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [events, setEvents] = useState([])
    const [modal, setModal] = useState(false)
    const [id, setId] = useState("")
    const [loading,setLoading]= useState(false)

    useEffect(() => {
        const docsArray=[]
        const fetchDocs = async () => {
            setLoading(true)
            const querySnapshot = await getDocs
                
            (collection(database, "event"))
            querySnapshot.forEach((doc) => {
                docsArray.push({ ...doc.data(), id: doc.id })
                setLoading(false)
            })
            setEvents(docsArray)
        }
        fetchDocs()
    }, [])

    const toggleModal = (id) => {
        setModal(!modal)
        setId(id)
    }
    
    const deleteEvent = async (id) => {
        const docRef = doc(database, "event", id)
        await deleteDoc(docRef)
    }
    const signout = () => {
        signOut(auth).then(() => {
            navigate("/")
        }).catch((error) => {
            setError("Could not log you out.Try again")
        });
    }
    return (
        <center>
            <div className="header-container">
                <h2>Hello, Admin</h2>
                <div className="apps-btn">
                    <Link to="/addevents">Add Event</Link>
                </div>
                <div className="apps-btn">
                    <Link to="/Home">Back Home</Link>
                </div>
                <button onClick={signout} className="apps-btn">Log Out</button>
            </div>

            {error && <h4 style={{ color: "red" }, { textAlign: "center" }}>{error}</h4>}
            
            <h2 style={{ textAlign: "center" }}>Manage Events</h2>
            
            {loading && (
                <div className="loader">
                    <ClipLoader loading={loading} size={50} />
                </div>
            )}
            
            {events.length === 0 && loading=== false ? <h2>No upcoming events. Keep on checking the website and our socials for updates</h2> : events.map(event => {
                return <center key={event.id} className="admin-events" >
                    <h2>{event.eventName} </h2>
                    <p>Venue: {event.eventVenue}</p>
                    <p>Date: {event.eventDate} at 1600hrs</p>
                    <p>Total Attendees: {event.totalAttendees}</p>
                    <p>Regular Ticket Price: {event.regularTicket}</p>
                    <p>VIP Ticket Price: {event.vipTicket}</p>
                    <div className="btn-container">
                        <button type="submit" className="apps-btn" onClick={() => {
                        toggleModal(event.id)
                    }}>Edit Event</button>
                        <button type="submit" className="apps-btn" onClick={() => deleteEvent(event.id)}>Delete Event</button>
                    </div>
                </center>    
            })}
            {modal && (
            <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        {events.map(event => {
                            if (event.id === id) {
                                return <EditEvent ourevent={event} key={ event.id} />
                            }
                        })}
                    </div>
            </div>
      )}    
        </center>
    )
}

export default Admin
