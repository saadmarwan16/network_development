import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import 'react-datepicker/dist/react-datepicker.css'

const MoreAboutYou = ({ isAuthenticated }) => {
    const [bio, setBio] = useState('')
    const [selectedDate, setSelectedDate] = useState(null)
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)

    const onBioChange = e => {
        setBio(e.target.value)
        localStorage.setItem('bio', e.target.value)
    }

    const onSelectedDateChange = date => {
        setSelectedDate(date)
        localStorage.setItem('date', date)
    }

    const onSubmit = e => {
        e.preventDefault()

        localStorage.setItem('date', selectedDate)
        localStorage.setItem('bio', bio)
        setIsFormSubmitted(true)
    }

    if (isFormSubmitted) return <Redirect to="/register/set-passwords" />

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
                            <h3 className="auth__main__inner__form__heading">About You</h3>

                            <div className="auth__main__inner__form__inner">
                                <DatePicker className="auth__main__inner__form__inner__input"
                                    placeholderText="Date of birth"
                                    selected={selectedDate}
                                    onChange={date => onSelectedDateChange(date)}
                                    dateFormat='dd/MM/yyyy'
                                    isClearable
                                    showYearDropdown
                                    scrollableMonthYearDropdown
                                />
                            </div>

                            <div className="auth__main__inner__form__inner">
                                <input className="auth__main__inner__form__inner__input" 
                                    placeholder="Your bio" type="text" maxLength="160" 
                                    onChange={onBioChange} value={bio}
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

MoreAboutYou.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(MoreAboutYou)