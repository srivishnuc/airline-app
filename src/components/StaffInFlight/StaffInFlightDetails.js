import React from 'react'


const StaffInFlightDetails = ({ flight, name,checkInDetails   }) => {
    console.log(checkInDetails)
    return (<>
        <tr role="presentation">
            <td>{flight}</td>
            <td>{name}</td>
            <td>{mealsPreference}</td>
            <td>{services.map((ser, index) => <span key={index}>{ser}</span>)}</td>
        </tr>
    </>)
}

export default StaffInFlightDetails
