import React from 'react'
import './AirlineAdmin.scss'
import { Link, } from 'react-router-dom'
import { useAuthentication } from '../../customHooks/useAuthentication'

const AirlineAdmin = () => {
    useAuthentication('admin')
    return (
        <>
            <h1 className="fs-3">Admin Services</h1>
            <h2 className="fs-5">Choose any service to proceed further</h2>
            <div className="link-container">
                <Link className="link text-info bg-dark" to="passenger" title="Manage Passenger Link">Manage passenger</Link>
                <Link className="link text-info bg-dark" to="ancillary" title="Ancillary Services Link">Flight ancillary Services</Link>
            </div>
        </>
    )
}

export default AirlineAdmin