import React from 'react'
import './AirlineAdmin.scss'
import { Link, } from 'react-router-dom'
import { useAuthentication } from '../../customHooks/useAuthentication'

const AirlineAdmin = () => {
    useAuthentication('admin')
    return (
        <>
            <div className="link-container">
                <Link className="link" to="passenger">Manage passenger</Link>
                <Link className="link" to="ancillary">Flight ancillary Services</Link>
            </div>
        </>
    )
}

export default AirlineAdmin