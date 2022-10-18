import React, { useEffect } from "react"
import "./AdminManageAncillary.scss"
import BackButton from "../ResusableComponents/BackButton"
import { useAuthentication } from "../../customHooks/useAuthentication"
import { useDispatch, useSelector } from "react-redux"
import { getServices } from "../../Redux/Reducer/admin"
import ServiceList from "./ServicesList"
import Table from 'react-bootstrap/Table';

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
            <Table striped>
                <thead>
                    <tr>
                        <th>Flight Name</th>
                        <th>Ancillary services</th>
                        <th>Meals</th>
                    </tr>
                </thead>
                <tbody>
                {services.map((ser) => <ServiceList key={ser.name} flightname={ser.name} list={ser.list} meals={ser.meals} />)}
                </tbody>
            </Table>
        </>

    )
}

export default AdminManageAncillary