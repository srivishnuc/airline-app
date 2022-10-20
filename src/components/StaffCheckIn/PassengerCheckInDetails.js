import React from "react";

const PassengerCheckInDetails = ({ flight, name, isCheckedIn, seatno, services }) => {
    const servicesList = services.map((ser, index) => <span key={index}>{ser + (index === services.length - 1 ? '.' : ', ')}</span>)
    return (
        <tr role="presentation">
            <td>{flight}</td>
            <td>{seatno}</td>
            <td>{name}</td>
            <td>{isCheckedIn ? 'Y' : 'N'}</td>
            <td>{servicesList}</td>
        </tr>
    )
}

export default PassengerCheckInDetails