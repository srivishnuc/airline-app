import React, { useState } from "react";
import { delAncillary, editAncillary } from '../../Redux/Reducer/admin'
import { useDispatch } from "react-redux";

const ServiceList = ({ flight, service, id, setError }) => {

    const [isEdit, setisEdit] = useState(false)
    const [editVal, setEditVal] = useState(service)
    const dispatch = useDispatch()
    const EditServices = () => {
        setisEdit(true)
    }
    const DeleteServices = () => {
        dispatch(delAncillary({ id }))
    }

    const updateService = () => {
        if (editVal) {
            dispatch(editAncillary({ id, data: { service: editVal, flight } }))
            setisEdit(false)
        } else {
            setError(true)
        }
    }

    return (
        <tr>
            <td>{flight}</td>
            <td>{isEdit ? <><input type="text" value={editVal} onChange={e => { setError(false); setEditVal(e.target.value) }} />
                <button className="btn btn-link" onClick={updateService}>Update</button>
                <button className="btn btn-link" onClick={() => { setisEdit(false); setEditVal(service); setError(false) }}>Cancel</button> </> : service}</td>
            <td>
                <span> <button className="btn btn-link" onClick={EditServices}> Edit</button></span>
                <span> <button className="btn btn-link" onClick={DeleteServices}> Delete</button></span>
            </td>
        </tr>
    )
}

export default ServiceList