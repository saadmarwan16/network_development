import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signup } from '../actions/auth'
import { setAlert } from '../actions/alert'

const SetPasswords = ({ isAuthenticated, signup }) => {
    const [formDetails, setFormDetails] = useState({ 
        password: '',
        confirmation: ''
    })

    const { password, confirmation } = formDetails

    const onChange = e => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()

        if (password !== confirmation) {
            setAlert('Oops! Passwords do not match', 'danger')
        } else if (password.length < 8) {
            setAlert('Oops! Password must contain at least 8 characters', 'danger')
        } else {
            const name = localStorage.getItem('name')
            const username = localStorage.getItem('username')
            const date = localStorage.getItem('date')
            const bio = localStorage.getItem('bio')
            localStorage.clear()
            signup(name, username, date, bio, password, confirmation)
        }
    }

    if (isAuthenticated) return <Redirect to="/" />

    return (
        <>
            <Helmet>
                <title>Set Passwords - Network</title>
                <meta name="Set passwords page" 
                    content="Set your password to complete this last step" 
                />
            </Helmet>

            <div className="auth">
                <Link className="auth__logo-name" to="/">
                    <span className="auth__logo-name__inner">
                        <img className="auth__logo-name__inner__logo" src="/static/logo/logo512.png" alt="logo" />
                        <h2 className="auth__logo-name__inner__name">Network</h2>
                    </span>
                </Link>

                <div className="auth__main">
                    <div className="auth__main__inner">
                        <form className="auth__main__inner__form" onSubmit={onSubmit}>
                            <h3 className="auth__main__inner__form__heading">Password</h3>

                            <div className="auth__main__inner__form__inner">
                                <input className="auth__main__inner__form__inner__input" 
                                    placeholder="Password" type="password" name="password" 
                                    onChange={onChange} value={password}
                                />
                            </div>

                            <div className="auth__main__inner__form__inner">
                                <input className="auth__main__inner__form__inner__input" 
                                    placeholder="Confirmation" type="password" name="confirmation" 
                                    onChange={onChange} value={confirmation}
                                />
                            </div>

                            <div className="auth__main__inner__form__submit-btn">
                                <input className="auth__main__inner__form__submit-btn__inner custom-btn" 
                                    type="submit" value="Register" 
                                />
                            </div>

                            <p className="auth__main__inner__form__change">
                                <span className="auth__main__inner__form__change__span">
                                    Already have an account?
                                </span>
                                <Link className="auth__main__inner__form__change__link" to="/login">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

SetPasswords.propTypes = {
    signup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(SetPasswords)