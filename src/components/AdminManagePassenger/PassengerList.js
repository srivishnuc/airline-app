import React from "react";


const PassengerList = ({ flight, name, passno, address }) => {

    return (
        <tr>
            <td>{flight}</td>
            <td>{name}</td>
            <td>{passno}</td>
            <td>{address}</td>
        </tr>
    )
}

export default PassengerList