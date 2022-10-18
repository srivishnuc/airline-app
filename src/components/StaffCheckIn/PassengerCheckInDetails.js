import React from "react";

const PassengerCheckInDetails = ({ flight, name, isCheckedIn, seatno, services }) => {
    const servicesList = services.map((ser,index) => <span key={index}>{ser + (index === services.length-1 ? '.':', ')}</span>)
    return (
        <ul>
        <li>{flight}</li>
        <li>{seatno}</li>
        <li>{name}</li>
        <li>{isCheckedIn ? 'Y' : 'N'}</li>
        <li>{servicesList}</li>
        </ul>
    )
}

export default PassengerCheckInDetails