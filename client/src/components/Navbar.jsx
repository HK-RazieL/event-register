import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { loggedIn } from "../redux/actions";
import { connect } from "react-redux";
import SignUp from "./SignUp";
import Login from "./SignIn";
import Overview from "./Overview";
import EventRegistration from './RegisterForEvent';

class Navbar extends Component {
    logOut = () => {
        this.props.dispatch(loggedIn({ type: "LOGGED_IN", data: false }));
    }

    render() {
        return (
            <>
                <Router>
                    <nav>
                        {!this.props.isLoggedIn?.status ?
                            <>
                                <Link to="/create-user">Sign Up</Link>
                                <Link to="/login-user">Sign In</Link>
                            </>
                            :
                            <>
                                <Link to="/register-for-event">Register For Event</Link>
                                <Link to="/overview">Overview</Link>
                                <Link to="/login-user" onClick={this.logOut}>Log Out</Link>
                            </>
                        }
                    </nav>
                    <Routes>
                        <Route exact path="/overview" element={
                            !this.props.isLoggedIn
                                ? <Navigate replace to="/login-user" />
                                : <Overview />
                        } />
                        <Route exact path="/register-for-event" element={
                            !this.props.isLoggedIn
                                ? <Navigate replace to="/login-user" />
                                : <EventRegistration />
                        } />
                        <Route exact path="/create-user" element={<SignUp />} />
                        <Route exact path="/login-user" element={<Login />} />
                    </Routes>
                </Router>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(Navbar);
