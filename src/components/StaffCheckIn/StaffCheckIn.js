import React, { useEffect, useState } from 'react'
import './StaffCheckIn.scss'
import BackButton from '../ResusableComponents/BackButton'
import { useAuthentication } from "../../customHooks/useAuthentication"
import { getFlights, getPassengers, getServices } from '../../Redux/Reducer/admin'
import { getCheckin } from '../../Redux/Reducer/staff'
import { useDispatch, useSelector } from 'react-redux'
import PassengerCheckInDetails from './PassengerCheckInDetails'
import Table from 'react-bootstrap/table'
import Card from 'react-bootstrap/Card'

const StaffCheckIn = () => {
    useAuthentication('staff')
    const dispatch = useDispatch()
    const checkInDetails = useSelector(state => state.staffs.checkin)
    const admin = useSelector(state => state.admins)
    const [selectedFlight, setFlight] = useState('')
    const [checkedIn, setCheckedIn] = useState('')
    const [service, setService] = useState('')
    const [allpassenger, setAllPassenger] = useState(admin.passengers)
    const [allCheckIn, setAllCheckIn] = useState(checkInDetails)

    useEffect(() => {
        dispatch(getPassengers())
        dispatch(getCheckin())
        dispatch(getFlights())
        dispatch(getServices())
    }, [])
 
    const handleFilter = () => {
      
         
    }

    return (
        <>
        {   console.log(allpassenger)}
            <BackButton />
            <h1 className="fs-3">Check In</h1>
            <h2 className="fs-5">Check In Details</h2>

            <select onChange={e => { setFlight(e.target.value) }}>
                <option value="">Select Flight</option>
                {admin.flights.map(flight => <option key={flight.id} value={flight.value}>{flight.name}</option>)}
            </select>

            <select onChange={e => { setCheckedIn(e.target.value) }}>
                <option value="">CheckIn</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
            </select>

            <select onChange={e => { setService(e.target.value) }}>
                <option value="">Select Servies</option>
                {admin.services.map(service => <option key={service.id} value={service.id}>{service.service}</option>)}
            </select>

            <button onClick={handleFilter}>Filter</button>
            <Card>
                <Table>
                    <thead>
                        <tr>
                            <th>Flight</th>
                            <th>Seat No</th>
                            <th>Name</th>
                            <th>Checked In</th>
                            <th>Ancillary Services</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allpassenger.map((passenger, index) => <PassengerCheckInDetails key={index} flight={passenger.flight} name={passenger.name}  checkInDetails={allCheckIn.filter((chckin=> chckin.passenger === passenger.id))} />)}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

export default StaffCheckIn