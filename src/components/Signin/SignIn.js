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
            <h1 class="fs-3">Sign In Page</h1>
            <h2 class="fs-5">Enter your Login credentials</h2>
            <form onSubmit={login}>
            <div class="mb-3 ">
                <label for="username">Username:</label>
                <input id="username" className="input-text" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            </div>
            <div class="mb-3 ">
                <label for="password">Password:</label>
                <input id="password" className="input-text" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <div class="mb-3 ">
                <button type="submit">Submit</button>
            </div>
            </form>
        </>
    )
}



export default SignIn