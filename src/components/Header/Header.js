import React from "react";
import './Header.scss'
import logo from '../../../public/images/logo.png'
import Logout from '../Logout/Logout'

const Header = () => {

    return (
        <div className="header">
            <h1><img src={logo} alt="logo" width="50rem" height="50rem" /> SV Airline</h1>
            <Logout />
        </div >
    )
}

export default Header