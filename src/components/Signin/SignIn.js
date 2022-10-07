import React, { useEffect } from 'react'
const axios = require('axios').default;
import './SignIn.scss'

const SignIn = () => {
    useEffect(() => {
        axios.get('http://localhost:3006/users').then((res) => {
            console.log(res.data)
        })
    }, [])

    return (
        <>
            <h1>Sign In Page</h1>
        </>
    )
}

export default SignIn