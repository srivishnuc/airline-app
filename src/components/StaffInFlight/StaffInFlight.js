import React from "react";
import './StaffInFlight.scss'
import BackButton from "../ResusableComponents/BackButton";
import { useAuthentication } from "../../customHooks/useAuthentication"

const StaffInFlight = () => {

    useAuthentication('staff');
    return (
        <>
            <BackButton />
            <h1>Staff In Flight</h1>
        </>
    )
}

export default StaffInFlight
