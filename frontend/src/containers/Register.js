import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Register = ({ isAuthenticated }) => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)

    const [formDetails, setFormDetails] = useState({ 
        name: '',
        username: ''
    })

    const { name, username } = formDetails

    const onChange = e => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
        localStorage.setItem([e.target.name], e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()

        localStorage.setItem('name', name)
        localStorage.setItem('username', username)
        setIsFormSubmitted(true)
    }

    if (isFormSubmitted) return <Redirect to="/register/more-about-you" />

    if (isAuthenticated) return <Redirect to="/" />

    return (
        <>
            <Helmet>
                <title>Register - Network</title>
                <meta name="Register page" 
                    content="Register to join any of our incredible communities" 
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
                            <h3 className="auth__main__inner__form__heading">Register</h3>

                            <div className="auth__main__inner__form__inner">
                                <input className="auth__main__inner__form__inner__input"
                                    placeholder="Full name" type="text" name="name" 
                                    onChange={onChange} value={name}
                                />
                            </div>

                            <div className="auth__main__inner__form__inner">
                                <input className="auth__main__inner__form__inner__input"
                                    placeholder="Username" type="text" name="username" 
                                    onChange={onChange} value={username}
                                />
                            </div>

                            <div className="auth__main__inner__form__submit-btn">
                                <input className="auth__main__inner__form__submit-btn__inner custom-btn" 
                                    type="submit" value="Continue" 
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

Register.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Register)