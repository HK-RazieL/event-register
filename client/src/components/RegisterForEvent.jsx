import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const createParticipation = (participation, setResponse) => {
    fetch("/register-for-event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(participation)
    })
        .then(res => res)
        .then(json => {
            if (json.status === 200) {
                setResponse(`You have successfully registered for the event "${participation.event}".`);
            } else {
                setResponse(`You were not able to register for the event "${participation.event}".`);
            }
        });
}

const getEvents = (setData) => {
    fetch("/register-for-event")
        .then(res => res.json())
        .then(json => {
            setData(json)
        });
}

export function EventRegistration() {
    const [data, setData] = useState([])
    const [response, setResponse] = useState("");
    const username = useSelector((state) => state.isLoggedIn?.username);

    useEffect(() => getEvents(setData), []);

    return (
        <div className="centered w-100">
            <h2 className="mb-4">Register for an event</h2>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <td>Host</td>
                        <td>Event</td>
                        <td>Date of event</td>
                        <td>Description</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((event, index) => {
                        return (
                            <tr key={index}>
                                <td>{event.user}</td>
                                <td>{event.event}</td>
                                <td>{event.date}</td>
                                <td>{event.description}</td>
                                <td>{<Button
                                        variant="outline-danger"
                                        onClick={() => {
                                            let participation = {
                                                ...event,
                                                user: username
                                            }
                                            return createParticipation(participation, setResponse);
                                        }}
                                        style={{ width: "100%" }}
                                    >Join</Button>
                                    }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {response ? <h3 className="success-message">{response}</h3> : null}
        </div>
    )
}

export default EventRegistration;