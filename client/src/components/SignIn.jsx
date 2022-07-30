import React, { Component } from 'react';
import { loggedIn } from "../redux/actions";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form"

class Login extends Component {
    loginUser = (event) => {
        event.preventDefault();
        event.stopPropagation();

        fetch("/login-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then((res) => {
            return res.json()
        }).then((json) => {
            this.props.dispatch(loggedIn({
                type: "LOGGED_IN",
                data: {
                    username: this.state.username,
                    status: true
                }
            }));
        });
    }

    handleChange = (e) => {
        let target = e.target;
        this.setState({
            ...this.state,
            [target.name]: target.value
        });
    }

    render() {
        return (
            <div className="login-screen centered">
                {!this.props.isLoggedIn ?
                    <div className="auth-form">
                        <h1>Sign In</h1>
                        <Form method="POST" onSubmit={this.loginUser}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    required
                                />
                            </Form.Group>
                            <input type="submit" value="Sign In" />
                        </Form>
                    </div>
                    : <div className="card">
                        <h1>You have successfully logged in!</h1>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(Login);
