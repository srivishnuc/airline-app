import React, { useEffect } from "react";
import './StaffInFlight.scss'
import BackButton from "../ResusableComponents/BackButton";
import { useAuthentication } from "../../customHooks/useAuthentication"
import { useDispatch, useSelector } from 'react-redux'
import { getPassengers, getServices } from '../../Redux/Reducer/admin'
import { getCheckin } from '../../Redux/Reducer/staff'
import StaffInFlightDetails from './StaffInFlightDetails'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'

const StaffInFlight = () => {
    useAuthentication('staff');
    const dispatch = useDispatch();
    const checkInDetails = useSelector(state => state.staffs.checkin.filter((check => check.isCheckedIn)));
    const passengerDetails = useSelector(state => state.admins.passengers);

    useEffect(() => {
        dispatch(getPassengers())
        dispatch(getCheckin())
        dispatch(getServices())
    }, [])

    return (
        <>
            <BackButton />
            <h1 className="fs-3">In Flight</h1>
            <h2 className="fs-5">In Flight Details</h2>
            <Card>
                <Table>
                    <thead>
                        <tr>
                            <th>Flight</th>
                            <th>Name</th>
                            <th>Ancillary Services</th>
                            <th>Add/Remove Services</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passengerDetails.map(passenger => <StaffInFlightDetails key={passenger.id} id={passenger.id} flight={passenger.flight} name={passenger.name} checkInDetails={checkInDetails.find((chckin => chckin.passenger === passenger.id))} />)}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

export default StaffInFlight
