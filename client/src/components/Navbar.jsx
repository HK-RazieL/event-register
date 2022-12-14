import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { loggedIn } from "../redux/actions";
import { connect } from "react-redux";
import SignUp from "./SignUp";
import Login from "./SignIn";
import Overview from "./Overview";
import EventRegistration from "./RegisterForEvent";
import CreateEvent from "./CreateEvent"

class Navbar extends Component {
    logOut = () => {
        this.props.dispatch(loggedIn({ type: "LOGGED_IN", data: false }));
    }

    render() {
        return (
            <>
                <Router>
                    <nav>
                        <Link to="/overview">Overview</Link>
                        <Link to="/register-for-event">Register For Event</Link>
                        <Link to="/create-event">Create Event</Link>
                        <div>
                            {this.props.isLoggedIn?.status ?
                                <>
                                    <span className="text-light">Welcome, {this.props.isLoggedIn?.username}!</span>
                                    <Link to="/login-user" onClick={this.logOut}>Log Out</Link>
                                </>
                                :
                                <>
                                    <Link to="/create-user">Sign Up</Link>
                                    <Link to="/login-user">Sign In</Link>
                                </>
                            }
                        </div>
                    </nav>
                    <Routes>
                        <Route exact path="/overview" element={<Overview />} />
                        <Route exact path="/register-for-event" element={
                            !this.props.isLoggedIn
                                ? <Navigate replace to="/login-user" />
                                : <EventRegistration />
                        } />
                        <Route exact path="/create-event" element={
                            !this.props.isLoggedIn
                                ? <Navigate replace to="/login-user" />
                                : <CreateEvent />
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