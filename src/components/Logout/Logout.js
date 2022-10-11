import React from 'react'
import logout from '../../../public/images/logout.png'
import { useAuthentication } from '../../customHooks/useAuthentication'
const Logout = () => {
    //console.log(useAuthentication())
    return (!useAuthentication() && < img src={logout} alt="logo" width="50rem" height="50rem" />)
}

export default Logout