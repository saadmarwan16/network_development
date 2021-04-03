import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types'

var jwt = require('jsonwebtoken')

const isTokenValid = () => {
    const token = localStorage.getItem('token')
    const decodedToken = jwt.decode(token, {complete: true})

    try {
        const dateNow = new Date()
        return decodedToken.payload.exp < dateNow.getTime()
    } catch(_err) {
        return false
    }
}

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: isTokenValid(),
    loading: false
}

// eslint-disable-next-line
export default function(state=initialState, action) {
    const { type, payload } = action

    switch(type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.access)
            return {
                ...state,
                token: payload.access,
                isAuthenticated: true,
                loading: false
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                loading: true
            }
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state
    }
}