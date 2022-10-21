import React from "react";
import { useSelector } from "react-redux";



const PassengerCheckInDetails = ({ flight, name, checkInDetails }) => {
    const services = useSelector(state => state.admins.services)
    const servicesList = 
            checkInDetails.length ? 
            checkInDetails[0].services.map((service, index) => {
                const serviceObj = services.find(ser => ser.id === service);
                return (
                    <span 
                    key={index}>
                    {serviceObj.service}{(index === checkInDetails[0].services.length - 1) ? '.' : ', '}                
                    </span>
                )                
            }) 
            : <span></span>

    
    return (
        <tr role="presentation">
            <td>{flight}</td>
            <td>{checkInDetails[0].seatno}</td>
            <td>{name}</td>
            <td>{checkInDetails[0].isCheckedIn ? 'Y' : 'N'}</td>
            <td>{servicesList}</td>
        </tr>
    )
}

export default PassengerCheckInDetails