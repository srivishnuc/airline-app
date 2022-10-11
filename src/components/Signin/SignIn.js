import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getUsers } from '../../Redux/Reducer/user'
import './SignIn.scss'



const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigate()


    const login = async (e) => {
        e.preventDefault()
        if (username.length) {
            const loginUser = () => new Promise(
                (resolve) => {
                    resolve(dispatch(getUsers({ username, password })))
                }
            )
            setUsername('');
            setPassword('');

            const checkLogin = await loginUser()
            if (checkLogin && checkLogin.payload.length && checkLogin.payload[0].authorization === 'admin') {
                navigation('/admin')
            } else if (checkLogin && checkLogin.payload.length && checkLogin.payload[0].authorization === 'staff') {
                navigation('/staff')
            } else {
                alert('Invalid username or password')
            }
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