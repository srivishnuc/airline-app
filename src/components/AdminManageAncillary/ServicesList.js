import React from "react";
import { delAncillary, getServices } from '../../Redux/Reducer/admin'
import { useDispatch } from "react-redux";

const ServiceList = ({ flight, service, id }) => {
    console.log(id)

    const dispatch = useDispatch()
    const EditServices = () => {

    }
    const DeleteServices = () => {
        dispatch(delAncillary({ id }))
        dispatch(getServices())
    }

    return (
        <tr>
            <td>{flight}</td>
            <td>{service}</td>
            <td>
                <span> <button onClick={EditServices}> Edit</button></span>
                <span> <button onClick={DeleteServices}> Delete</button></span>
            </td>
        </tr>
    )
}

export default ServiceList