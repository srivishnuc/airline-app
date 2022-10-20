import React, { useEffect, useState } from "react"
import "./AdminManagePassenger.scss"
import BackButton from "../ResusableComponents/BackButton"
import { useAuthentication } from "../../customHooks/useAuthentication"
import { getPassengers, getFlights, postPassenger } from "../../Redux/Reducer/admin"
import { useDispatch, useSelector } from "react-redux"
import PassengerList from "./PassengerList"
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Card from "react-bootstrap/Card"

const AdminManagePassenger = () => {
    useAuthentication("admin")
    const dispatch = useDispatch()
    const admin = useSelector(state => state.admins)
    const [isAddPassenger, setAddPassenger] = useState(false)
    const [name, setName] = useState('')
    const [passNo, setPassNo] = useState('')
    const [address, setAddress] = useState('')
    const [selectedFlight, setFlight] = useState('')
    const [isError, setError] = useState(false)

    useEffect(() => {
        dispatch(getPassengers())
        dispatch(getFlights())
    }, [])

    const addPassenger = () => {
        if (!isAddPassenger) {
            setAddPassenger(true)
            setFlight(admin.flights[0].name)
        } else {
            if (name && passNo && address) {
                dispatch(postPassenger({ flight: selectedFlight, name, passportNo: passNo, address }))
                setAddPassenger(false)
                setError(false)
                setName('')
                setPassNo('')
                setAddress('')
            } else {
                setError(true)
            }

        }
    }

    const cancelAdd = () => {
        setError(false)
        setAddPassenger(false);
        setName('')
        setPassNo('')
        setAddress('')
    }
    return (
        <>
            <BackButton />
            <h1 className="fs-3">Manage Passenger</h1>
            <h2 className="fs-5">Passengers List</h2>
            <Card>
                {isError && <Alert variant="danger">Enter all required passenger details</Alert>}
                <Table striped role="presentation">
                    <caption>List of passengers</caption>
                    <thead>
                        <tr>
                            <td>
                                {isAddPassenger && <select onChange={(e) => { setFlight(e.target.value) }}>{admin.flights.map(flight => <option key={flight.id} value={flight.value} >{flight.name}</option>)}</select>}
                            </td>
                            <td>
                                {isAddPassenger && <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />}
                            </td>
                            <td>
                                {isAddPassenger && <input type="text" placeholder="Passport No" value={passNo} onChange={e => setPassNo(e.target.value)} />}
                            </td>
                            <td>
                                {isAddPassenger && <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />}
                            </td>
                            <td>
                                <span><button onClick={addPassenger}>{isAddPassenger ? 'Add' : 'Add Passenger'}</button></span>
                                &nbsp; {isAddPassenger && <span><button onClick={cancelAdd}>&nbsp;Cancel</button></span>}
                            </td>
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
                        {admin.passengers.map((plst) => <PassengerList key={plst.id} id={plst.id} name={plst.name} flight={plst.flight} address={plst.address} passno={plst.passportNo} setError={setError} />)}
                    </tbody>
                </Table>
            </Card>
        </>
    )
}

export default AdminManagePassenger