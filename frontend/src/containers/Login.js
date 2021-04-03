import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../actions/auth'

const Login = ({ isAuthenticated, login }) => {
    const [formDetails, setFormDetails] = useState({ 
        username: '',
        password: ''
    })

    const { username, password } = formDetails

    const onChange = e => {
        setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()

        login(username, password)
    }

    if (isAuthenticated) return <Redirect to="/" />

    return (
        <>
            <Helmet>
                <title>Login - Network</title>
                <meta name="Login page" content="Login to have a unique experience" />
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
                            <h3 className="auth__main__inner__form__heading">Login</h3>

                            <div className="auth__main__inner__form__inner">
                                <input className="auth__main__inner__form__inner__input"
                                    placeholder="Username" type="text" name="username" 
                                    onChange={onChange} value={username}
                                />
                            </div>

                            <div className="auth__main__inner__form__inner">
                                <input className="auth__main__inner__form__inner__input" 
                                    placeholder="Password" type="password" name="password" 
                                    onChange={onChange} value={password}
                                />
                            </div>

                            <div className="auth__main__inner__form__meta">
                                <input className="auth__main__inner__form__meta__remember-me" 
                                    type="checkbox" id="keep-logged" name="keep-logged" 
                                    value="Keep me logged in" defaultChecked
                                />
                                <label htmlFor="keep-logged"> Keep me logged in</label>
                            </div>

                            <div className="auth__main__inner__form__submit-btn">
                                <input className="auth__main__inner__form__submit-btn__inner custom-btn" 
                                    type="submit" value="Login" 
                                />
                            </div>

                            <p className="auth__main__inner__form__change">
                                <span className="auth__main__inner__form__change__span">
                                    Don't have an account?
                                </span>
                                <Link className="auth__main__inner__form__change__link" to="/register">
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)