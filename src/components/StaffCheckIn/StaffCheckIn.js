import React from 'react'
import './StaffCheckIn.scss'
import BackButton from '../ResusableComponents/BackButton'
import { useAuthentication } from "../../customHooks/useAuthentication"

const StaffCheckIn = () => {
    useAuthentication('staff')
    return (
        <>
            <BackButton />
            <h1>Staff Check In</h1>
        </>
    )
}

export default StaffCheckIn