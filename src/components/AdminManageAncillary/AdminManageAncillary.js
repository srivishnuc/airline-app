import React from 'react'
import './AdminManageAncillary.scss'
import BackButton from '../ResusableComponents/BackButton'
import { useAuthentication } from "../../customHooks/useAuthentication"

const AdminManageAncillary = () => {

    useAuthentication('admin')
    return (
        <>
            <BackButton />
            <h1>Admin Manage Ancillary</h1>
        </>

    )
}

export default AdminManageAncillary