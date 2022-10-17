import React, { useEffect } from "react"
import "./AdminManagePassenger.scss"
import BackButton from "../ResusableComponents/BackButton"
import { useAuthentication } from "../../customHooks/useAuthentication"
import { getPassengers } from "../../Redux/Reducer/admin"
import { useDispatch, useSelector } from "react-redux"
import PassengerList from "./PassengerList"

const AdminManagePassenger = () => {
    useAuthentication("admin")
    const dispatch = useDispatch()
    const passengerList = useSelector(state => state.admins.passengers)
    useEffect(() => {
        dispatch(getPassengers())
    }, [])
    return (
        <>
            <BackButton />
            <h1>Admin Manage Passenger</h1>
            {passengerList.map((plst) => <PassengerList key={plst.id} name={plst.name} flight={plst.flight} address={plst.address} passno={plst.passportNo} />)}
        </>
    )
}

export default AdminManagePassenger