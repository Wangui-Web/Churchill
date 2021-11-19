import React, { useState,useEffect} from 'react'
import Header from './Header';
import { getDocs,collection } from '@firebase/firestore';
import { database } from '../config/firebaseConfig';
import "../App.css"
import "./Modal.css"
import Customer from './Customer';

function Home() {
    const [events, setEvents] = useState([])
    const [id, setId] = useState("")
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const docsArray=[]
        const fetchDocs=async () => {
            const querySnapshot = await getDocs(collection(database, "event"))
            querySnapshot.forEach((doc) => {
                docsArray.push({ ...doc.data(), id: doc.id })
            })
            setEvents(docsArray)
        }
        fetchDocs()
    }, [])
    const toggleModal = (id) => {
        setModal(!modal)
        setId(id)
    }
    
    return (
        <div >
            <Header/>
            <center>
                <h2>Current Events</h2>
                {events.length === 0 ? <h2>No upcoming events. Keep on checking the website and our socials for updates</h2> : events.map(event => {
                    return <center key={event.id} >
                        
                        <table style={{width:"90%"}}>
                            <tr>
                                <th>Event Name</th>
                                <th>Event Venue</th>
                                <th>Event Date</th>
                                <th>Total Attendees</th>
                                <th>Regular Ticket</th>
                                <th>VIP Ticket</th>
                                <th>Buy Ticket</th>
                            </tr>
                            <tr>
                                <td>{event.eventName}</td>
                                <td> {event.eventVenue}</td>
                                <td>{event.eventDate}</td>
                                <td>{event.totalAttendees}</td>
                                <td>{event.regularTicket}</td>
                                <td>{event.vipTicket}</td>
                                <td>
                                    <button type="submit"  onClick={() => {
                            toggleModal(event.id)
                                    }}>Buy Ticket</button>
                                </td>
                            </tr>
                            
                        </table>
                    </center>
                })}
                {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                            <div className="modal-content">
                                {events.map(event => {
                                    if (event.id === id) {
                                        return <Customer ourevent={event} key={ event.id} />
                                    }
                                })}
                            </div>
                    </div>
                )} 
            </center>   
        </div>
    )
}

export default Home
