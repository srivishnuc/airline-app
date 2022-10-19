import React, { useEffect,useState } from "react"
import "./AdminManagePassenger.scss"
import BackButton from "../ResusableComponents/BackButton"
import { useAuthentication } from "../../customHooks/useAuthentication"
import { getPassengers } from "../../Redux/Reducer/admin"
import { useDispatch, useSelector } from "react-redux"
import PassengerList from "./PassengerList"
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Card from "react-bootstrap/Card"

const AdminManagePassenger = () => {
    useAuthentication("admin")
    const dispatch = useDispatch()
    const admin = useSelector(state => state.admins)
    const [isAddPassenger,setAddPassenger] = useState(false)
    const [name,setName] = useState('')
    const [passNo,setPassNo] = useState('')
    const [address,setAddress] = useState('')

    useEffect(() => {
        dispatch(getPassengers())
        dispatch(getFlights())
    }, [])
    return (
        <>
            <BackButton />
            <h1>Admin Manage Passenger</h1>

            <Card>
                <Table striped>
                    <thead>
                        <tr>
                            <th>{isAddPassenger && <select onChange={(e) => { setFlight(e.target.value) }}>{admin.flights.map(flight => <option key={flight.id} value={flight.value} >{flight.name}</option>)}</select>}</th>
                            <th>{isAddPassenger && <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>} </th>
                            <th>{isAddPassenger && <input type="text" placeholder="Passport No" value={passNo} onChange={e=>setPassNo(e.target.value)}/> }</th>
                            <th>{isAddPassenger && <input type="text" placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} /> }</th>
                            <th><span><button onClick={addPassenger}>{isAddPassenger ? 'Add' : 'Add Passenger'}</button></span>
                            &nbsp; {isAddPassenger && <span><button onClick={cancelAdd}>&nbsp;Cancel</button></span>}</th>
                        </tr>
                        <tr>
                            <th>Flight</th>
                            <th>Name</th>
                            <th>Passport No</th>
                            <th>Address</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admin.passengerList.map((plst) => <PassengerList key={plst.id} name={plst.name} flight={plst.flight} address={plst.address} passno={plst.passportNo} />)}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

export default AdminManagePassenger