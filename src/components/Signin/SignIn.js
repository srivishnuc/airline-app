import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../Redux/Reducer/user'

import './SignIn.scss'



const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();


    const login = (e) => {
        e.preventDefault()
        if (username.length) {
            dispatch(getUsers({ username, password, authorization: 'admin' }))
            setUsername('');
            setPassword('');
        } else {
            alert('Enter username')
        }
    }

    return (
        <>
            <h1>Sign In Page</h1>
            <form onSubmit={login}>
                <input className="input-text" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input className="input-text" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default SignIn