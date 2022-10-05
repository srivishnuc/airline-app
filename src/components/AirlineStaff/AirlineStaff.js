import React from "react"
import { Link } from "react-router-dom"
import "./AirlineStaff.scss"
import BackButton from "../ResusableComponents/BackButton"
const AirlineStaff = () => {
    return (
        <>
            <BackButton />
            <div className="link-container">
                <Link className="link" to="checkin">Check-In</Link>
                <Link className="link" to="inflight">In-Flight</Link>
            </div>
        </>

    )
}

export default AirlineStaff