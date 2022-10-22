import React from 'react'
import { useSelector } from 'react-redux'


const StaffInFlightDetails = ({ flight, name, checkInDetails }) => {
    const services = useSelector(state => state.admins.services)

    const servicesList = checkInDetails !== undefined ?
        checkInDetails.services.map((service, index) => {
            const serviceObj = services.length ? services.find(ser => ser.id === service) : [];
            return (
                <span key={index}>
                    {serviceObj.service}{(index === checkInDetails.services.length - 1) ? '.' : ', '}
                </span>
            )
        }) : <span></span>
    return (<>
        <tr role="presentation">
            <td>{flight}</td>
            <td>{name}</td>
            <td>{servicesList}</td>
        </tr>
    </>)
}

export default StaffInFlightDetails
