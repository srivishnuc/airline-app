import React, { useEffect } from "react";
import './StaffInFlight.scss'
import BackButton from "../ResusableComponents/BackButton";
import { useAuthentication } from "../../customHooks/useAuthentication"
import { useDispatch, useSelector } from 'react-redux'
import { getPassengers } from '../../Redux/Reducer/admin'
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
    }, [])
    let passengerInFlightDetails = []
    for (let i = 0; i < passengerDetails.length; i++) {
        checkInDetails.forEach(chckDetails => {
            if (chckDetails.passenger === passengerDetails[i].id) {
                passengerInFlightDetails.push({
                    ...passengerDetails[i],
                    ...chckDetails
                })
            }
        })
    }
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
                        </tr>
                    </thead>
                    <tbody>
                        {passengerInFlightDetails.map(inflt => <StaffInFlightDetails key={inflt.id} flight={inflt.flight} name={inflt.name} mealsPreference={inflt.mealsPreference} services={inflt.services} />)}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

export default StaffInFlight
