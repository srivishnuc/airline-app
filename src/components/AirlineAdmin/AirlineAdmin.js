import React from 'react'
import './AirlineAdmin.scss'
import { Link } from 'react-router-dom'
import BackButton from '../ResusableComponents/BackButton'
const AirlineAdmin = () => {
    return (
        <>
            <BackButton />
            <div className="link-container">
                <Link className="link" to="passenger">Manage passenger</Link>
                <Link className="link" to="ancillary">Flight ancillary Services</Link>
            </div>
        </>
    )
}

export default AirlineAdmin