import React, { useEffect } from "react"
import "./AdminManageAncillary.scss"
import BackButton from "../ResusableComponents/BackButton"
import { useAuthentication } from "../../customHooks/useAuthentication"
import { useDispatch, useSelector } from "react-redux"
import { getServices } from "../../Redux/Reducer/admin"
import ServiceList from "./ServicesList"

const AdminManageAncillary = () => {
    useAuthentication("admin")
    const dispatch = useDispatch()
    const services = useSelector(state => state.admins.services)
    useEffect(() => {
        dispatch(getServices())
    }, [])

    return (
        <>
            <BackButton />
            <h1>Admin Manage Ancillary</h1>
            {services.map((ser) => <ServiceList key={ser.name} flightname={ser.name} list={ser.list} />)}
        </>

    )
}

export default AdminManageAncillary