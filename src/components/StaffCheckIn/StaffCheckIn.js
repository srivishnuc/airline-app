import React, { useEffect } from 'react'
import './StaffCheckIn.scss'
import BackButton from '../ResusableComponents/BackButton'
import { useAuthentication } from "../../customHooks/useAuthentication"
import { getPassengers } from '../../Redux/Reducer/admin'
import { getCheckin } from '../../Redux/Reducer/staff'
import { useDispatch, useSelector } from 'react-redux'
import PassengerCheckInDetails from './PassengerCheckInDetails'
import Table from 'react-bootstrap/table'
import Card from 'react-bootstrap/Card'

const StaffCheckIn = () => {
    useAuthentication('staff')
    const dispatch = useDispatch()
    const checkInDetails = useSelector(state => state.staffs.checkin)
    const passengerDetails = useSelector(state => state.admins.passengers)


    useEffect(() => {
        dispatch(getPassengers())
        dispatch(getCheckin())
    }, [])


    let passengerCheckInDetails = []
    for (let i = 0; i < passengerDetails.length; i++) {
        checkInDetails.forEach(chckDetails => {
            if (chckDetails.passenger === passengerDetails[i].id) {
                passengerCheckInDetails.push({
                    ...passengerDetails[i],
                    ...chckDetails
                })
            }
        })
    }

    return (
        <>
            <BackButton />
            <h1 className="fs-3">Check In</h1>
            <h2 className="fs-5">Check In Details</h2>
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
                        {passengerCheckInDetails.map((passenger, index) => <PassengerCheckInDetails key={index} flight={passenger.flight} name={passenger.name} isCheckedIn={passenger.isCheckedIn} seatno={passenger.seatno} services={passenger.services} />)}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

export default StaffCheckIn