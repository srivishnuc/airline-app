import React from "react"
import { Link, } from "react-router-dom"
import "./AirlineStaff.scss"
import { useAuthentication } from "../../customHooks/useAuthentication"

const AirlineStaff = () => {
    useAuthentication('staff')
    return (
        <>
            <div className="link-container">
                <Link className="link" to="checkin">Check-In</Link>
                <Link className="link" to="inflight">In-Flight</Link>
            </div>
        </>

    )
}

export default AirlineStaff