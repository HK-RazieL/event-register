import React, { Component } from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

class SignUp extends Component {
    state = {
        status: ""
    }

    createUser = (event) => {
        event.preventDefault();
        event.stopPropagation();

        fetch("/create-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then((res) => {
            if (res.status === 409) {
                this.setState({
                    status: "User Already Exists!"
                });
            } else {
                this.setState({
                    status: "Success!"
                });
            }
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
            <div className="auth-form centered">
                <h1>Sign Up</h1>
                <Form method="POST" onSubmit={this.createUser}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder="Username"
                            name="username"
                            onChange={this.handleChange}
                            autoComplete="off"
                            required />

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control type="email"
                            placeholder="Email"
                            name="email"
                            onChange={this.handleChange}
                            autoComplete="off"
                            required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel"
                            placeholder="Phone (111-111-111)"
                            name="phone"
                            onChange={this.handleChange}
                            autoComplete="off"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                            required />

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange}
                            autoComplete="off"
                            required />
                    </Form.Group>
                    <input type="submit" value="Sign Up"/>
                    {
                        this.state.status ? <div style={{ color: "red" }}>{this.state.status}</div> : ""
                    }
                </Form>
            </div>
        );
    }
}

export default SignUp;
