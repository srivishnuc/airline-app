import React, { useEffect, useState } from "react";
import './StaffInFlight.scss'
import BackButton from "../ResusableComponents/BackButton";
import { useAuthentication } from "../../customHooks/useAuthentication"
import { useDispatch, useSelector } from 'react-redux'
import { getPassengers, getServices, getFlights } from '../../Redux/Reducer/admin'
import { getCheckin } from '../../Redux/Reducer/staff'
import StaffInFlightDetails from './StaffInFlightDetails'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'

const StaffInFlight = () => {
    useAuthentication('staff');
    const dispatch = useDispatch();
    const checkInDetails = useSelector(state => state.staffs.checkin.filter((check => check.isCheckedIn)));
    const passengerDetails = useSelector(state => state.admins.passengers);
    const flights = useSelector(state => state.admins.flights)
    const [selectedFlight, setFlight] = useState(flights.length && flights[0].id)
    useEffect(() => {
        dispatch(getPassengers())
        dispatch(getCheckin())
        dispatch(getServices())
        dispatch(getFlights())
    }, [])

    return (
        <>
            {console.log(flights.length && flights[0].id)}
            <BackButton />
            <h1 className="fs-3">In Flight</h1>
            <h2 className="fs-5">In Flight Details</h2>
            <select value={selectedFlight} onChange={e => { setFlight(e.target.value) }}>
                <option value="">Select Flight</option>
                {flights.map((flight) =>
                    <option key={flight.id} value={flight.id}>{flight.name} </option>
                )}

            </select>
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
                        {passengerDetails.filter(passenger => passenger.flight === selectedFlight).map(passenger => <StaffInFlightDetails key={passenger.id} id={passenger.id} flight={passenger.flight} name={passenger.name} checkInDetails={checkInDetails.find((chckin => chckin.passenger === passenger.id))} />)}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

export default StaffInFlight
