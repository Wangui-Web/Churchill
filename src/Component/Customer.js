import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../App.css"

function Customer({ourevent}) {
    const [numberOfTickets, setNumberOfTickets] = useState(0)
    const [isRegularChecked,setIsRegularChecked]=useState(false)
    const [isVipChecked, setIsVipChecked] = useState(false)
    const regularTicketPrice= ourevent.regularTicket
    const vipTicketPrice= ourevent.vipTicket
    let regularamount = 0
    let vipamount = 0
    
    const handleChangeRegular = () => {
        setIsRegularChecked(!isRegularChecked)
    }
    const handleChangeVip = () => {
        setIsVipChecked(!isVipChecked)
    }
    if (isRegularChecked) {
        regularamount= regularTicketPrice * numberOfTickets
    }
    if (isVipChecked) {
        vipamount=vipTicketPrice * numberOfTickets
    }

    return (
        <div>
            <h1>Churchill Show</h1>
            <h2>{ ourevent.eventName} Tickets</h2>
            <form >
                <div className="input-container">
                    <label >Regular Ticket</label><br />
                    <input type="checkbox" name="regular" value={isRegularChecked} onChange={ ()=>handleChangeRegular()} required/>
                    <label >VIP Ticket</label><br/>
                    <input type="checkbox" name="vip" value={isVipChecked} onChange={ ()=>handleChangeVip()} required/>
                </div>
                <div className="input-container">
                    <label> Number of tickets(0 to 5)</label>
                    <input type="number" min="0" step="1" max="5" value={numberOfTickets} onChange={e => { setNumberOfTickets(e.target.value) }} required/>
                </div>
                <div className="input-container">
                    <label> Amount to Pay</label>
                    <p>{isRegularChecked===true ? ourevent.regularTicket*numberOfTickets: ourevent.vipTicket*numberOfTickets }</p>
                </div>
                <div className="apps-btn">
                    <Link to="/payments" >Pay</Link>
                </div>
            </form>
        </div>
    )
}

export default Customer
