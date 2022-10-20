import React from "react";
import './Header.scss'
import logo from '../../../public/images/logo.png'
import Logout from '../Logout/Logout'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate()
    return (
        <header className="header">
            <div className="fs-1 text-white fw-bold" onClick={() => navigate('/')}><img src={logo} alt="Airlines logo" width="50rem" height="50rem" /> SV Airline</div>
            <Logout />
        </header >
    )
}

export default Header