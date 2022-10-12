import React from "react";


const PassengerList = ({ flight, name, passno, address }) => {

    return (
        <ul>
            <li>{flight}</li>
            <li>{name}</li>
            <li>{passno}</li>
            <li>{address}</li>
        </ul>
    )
}

export default PassengerList