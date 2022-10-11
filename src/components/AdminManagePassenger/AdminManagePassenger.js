import React from 'react'
import './AdminManagePassenger.scss'
import BackButton from '../ResusableComponents/BackButton'
import { useAuthentication } from "../../customHooks/useAuthentication"

const AdminManagePassenger = () => {
    useAuthentication('admin')
    return (
        <>
            <BackButton />
            <h1>Admin Manage Passenger</h1>
        </>
    )
}

export default AdminManagePassenger