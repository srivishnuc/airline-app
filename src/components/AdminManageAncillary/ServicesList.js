import React from "react";

const ServiceList = ({ flightname, list }) => {
    const servicelist = list.map((lst, index) =>
        <span key={index}>{lst}{index === (list.length - 1) ? '.' : ", "}</span>
    )
    return (
        <ul>
            <li>{flightname}</li>
            <li>{servicelist}</li>
        </ul>
    )
}

export default ServiceList