import React, { useEffect } from 'react'
import './StaffCheckIn.scss'
import BackButton from '../ResusableComponents/BackButton'
import { useAuthentication } from "../../customHooks/useAuthentication"
import { getPassengers } from '../../Redux/Reducer/admin'
import { getCheckin } from '../../Redux/Reducer/staff'
import { useDispatch, useSelector } from 'react-redux'
import PassengerCheckInDetails from './PassengerCheckInDetails'

const StaffCheckIn = () => {
    useAuthentication('staff')
    const dispatch = useDispatch()
    const checkInDetails = useSelector(state => state.staffs.checkin)
    const passengerDetails = useSelector(state => state.admins.passengers)


    useEffect(() => {
        dispatch(getPassengers())
        dispatch(getCheckin())
    }, [])

    // const passengerCheckInDetails = ((arr1, arr2) => {
    //     let arr = []
    //     if (arr1.length && arr2.length) {
    //          arr1.map((item, i) => {
    //             if (item.id === arr2[i].passenger) {
    //                 //merging two objects
    //                 arr.push({ ...item, ...arr2[i] })                    
    //             }
    //         })
    //         return arr
    //     } else return [{ id: "", flight: "", name: "", isCheckedIn: "", seatno: "", services: [] }]
    // })(passengerDetails, checkInDetails)

    let passengerCheckInDetails = []
    for(let i = 0; i<passengerDetails.length;i++){
        checkInDetails.forEach(chckDetails => {
           if(chckDetails.passenger === passengerDetails[i].id){
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
            <h1 class="fs-3">Check In</h1>
            <h2 class="fs-5">Check In Details</h2>
            {passengerCheckInDetails.map((passenger, index) => <PassengerCheckInDetails key={index} flight={passenger.flight} name={passenger.name} isCheckedIn={passenger.isCheckedIn} seatno={passenger.seatno} services={passenger.services} />)}
        </>
    )
}

export default StaffCheckIn