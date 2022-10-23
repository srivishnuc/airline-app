import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select';
import { editServices } from '../../Redux/Reducer/staff'

const StaffInFlightDetails = ({ flight, name, checkInDetails, id }) => {

    const intialOption = []
    const dispatch = useDispatch()
    const [modifyServices, setModifyServices] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    const [updateBtn, toggleBtn] = useState(true);
    console.log(selectedOption)
    const services = useSelector(state => state.admins.services)
    const options = services.filter(service => service.flight === flight).map(
        ser => ({ label: ser.service, value: ser.id })
    )
    const servicesList = checkInDetails !== undefined ?
        checkInDetails.services.map((service, index) => {
            const serviceObj = services.length ? services.find(ser => ser.id === service) : [];
            services.length && intialOption.push({ label: serviceObj.service, value: service })
            return (
                <span key={index}>
                    {serviceObj.service}{(index === checkInDetails.services.length - 1) ? '.' : ', '}
                </span>
            )
        }) : <span></span>

    const showModify = () => {
        setSelectedOption(intialOption)
        setModifyServices(true)
    }

    const hideModify = () => {
        setSelectedOption(intialOption)
        setModifyServices(false)
        toggleBtn(true)
    }

    const modifyService = () => {
        dispatch(editServices({ id, data: { services: selectedOption.map(option => option.value) } }))
        setModifyServices(false)
        toggleBtn(true)
    }
    const setChange = (selectedOption) => {
        setSelectedOption(selectedOption)
        toggleBtn(false)
    }
    return (<>
        <tr role="presentation">
            <td>{flight}</td>
            <td>{name}</td>
            <td>{servicesList}</td>
            <td>{modifyServices ?
                <>
                    <Select defaultValue={selectedOption} onChange={setChange} options={options} isMulti />
                    <button onClick={modifyService} disabled={updateBtn}>Update</button>
                    <button onClick={hideModify}>Cancel</button>
                </>
                : <button onClick={showModify}>Modify</button>}
            </td>
        </tr>
    </>)
}

export default StaffInFlightDetails
