import React from "react";

const ServiceList = ({ flightname, list, meals }) => {

    const EditServices = () => {

    }
    const DeleteServices = () => {

    }
    const AddServices = () => {

    }
    const listMap = (lists) => lists.map((lst, index) =>         
            <span key={index}>{lst}{index === (lists.length - 1) ? '.' : ", "}</span>         
    )
    const servicelist = listMap(list)
    const mealsList = listMap(meals)
    return (
        <tr>
            <td>{flightname}</td>
            <td>{servicelist}</td>
            <td>
            <span> <button onClick={EditServices}> Edit</button></span>
            <span> <button onClick={DeleteServices}> Delete</button></span>
            <span> <button onClick={AddServices}> Add</button></span>
            </td>
            <td>{mealsList}</td>
        </tr>
    )
}

export default ServiceList