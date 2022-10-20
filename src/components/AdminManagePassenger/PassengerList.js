import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPassenger as updatePass } from '../../Redux/Reducer/admin'


const PassengerList = ({ flight, id, name, passno, address, setError }) => {

    const [editPassenger, setEditPassenger] = useState(false)
    const [psname, setName] = useState(name)
    const [pspno, setPassno] = useState(passno)
    const [psadd, setAddress] = useState(address)
    const [pflight, setFlight] = useState(flight)
    const flights = useSelector(state => state.admins.flights)
    const dispatch = useDispatch();
    const updatePassenger = () => {
        if (!editPassenger) {
            setEditPassenger(true)
        } else {
            if (psname && pspno && psadd) {
                dispatch(updatePass({ id, data: { flight: pflight, name: psname, address: psadd, passportNo: pspno } }))
                setEditPassenger(false)
                setError(false)
            } else {
                setError(true)
            }
        }
    }
    return (
        <tr>
            <td>{editPassenger ? <select onChange={(e) => { setFlight(e.target.value) }}>{flights.map(flight => <option key={flight.id} value={flight.value} >{flight.name}</option>)}</select> : flight}</td>
            <td>{editPassenger ? <input type="text" value={psname} onChange={(e) => { setName(e.target.value) }} /> : name}</td>
            <td>{editPassenger ? <input type="text" value={pspno} onChange={(e) => { setPassno(e.target.value) }} /> : passno}</td>
            <td>{editPassenger ? <input type="text" value={psadd} onChange={(e) => { setAddress(e.target.value) }} /> : address}</td>
            <td>{<button className="btn btn-link" onClick={updatePassenger}>{editPassenger ? 'Update' : 'Edit'}</button>}
                {editPassenger && <button className="btn btn-link" onClick={() => { setName(name); setPassno(passno); setAddress(address); setEditPassenger(false); setError(false) }}>&nbsp;Cancel</button>}</td>
        </tr>
    )
}

export default PassengerList