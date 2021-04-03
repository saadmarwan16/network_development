import axios from 'axios'
import { setAlert } from './alert'
import {
    LOGIN_SUCCESS,
    SIGNUP_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_FAIL,
    LOGOUT
} from './types'

export const login = (username, password) => async dispatch => {
    const config = {
        'Content-Type': 'application/json'
    }

    const body = JSON.stringify({
        username: username,
        password: password
    })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_ROOT_URL}/api/token`, body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
            username: username
        })

        dispatch(setAlert('Login successful', 'success'))
    } catch(_err) {
        dispatch({
            type: LOGIN_FAIL,
        })

        dispatch(setAlert('Oops! Login failed', 'danger'))
    }
}

export const signup = ({ name, username, date, bio, password, confirmation }) => async dispatch => {
    const config = {
        'Content-Type': 'application/json'
    }

    const body = JSON.stringify({
        name: name,
        username: username,
        birth_date: date,
        bio: bio,
        passoword: password,
        confirmation: confirmation
    })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_ROOT_URL}/api/accounts/signup`, body, config)

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })

        dispatch(login(username, password))
    } catch (_err) {
        dispatch({
            type: SIGNUP_FAIL
        })

        dispatch(setAlert('Oops! Registration failed', 'danger'))
    }
}

export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
    dispatch(setAlert('Logout successful', 'success'))
}