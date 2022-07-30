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
                setResponse(`You have successfully registered for the event "${participation.eventName}".`);
            } else {
                setResponse(`You might already be registered for the event "${participation.eventName}".`);
            }
        });
}

const cancelEvent = (data, setData, setResponse) => {
    fetch("/register-for-event", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => response.json())
        .then(json => {
            getEvents(setData);
            setResponse(`Event "${data.eventName}" cancelled.`);
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

    useEffect(() => getEvents(setData), [response]);

    return (
        <div className="centered w-100 text-center">
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
                                <td>{event.host}</td>
                                <td>{event.eventName}</td>
                                <td>{event.date}</td>
                                <td>{event.description}</td>
                                <td><Button
                                    variant="outline-success"
                                    onClick={() => {
                                        let participation = {
                                            ...event,
                                            currentUser: username,
                                            eventId: event._id
                                        }
                                        delete participation._id;
                                        createParticipation(participation, setResponse);
                                    }}
                                    style={{ width: "50%" }}
                                >Join</Button>
                                    {username === event.host ?
                                        <Button
                                            variant="outline-danger"
                                            onClick={() => {
                                                cancelEvent(event, setData, setResponse)
                                            }}
                                            style={{ width: "50%" }}
                                        >Cancel Event</Button> :
                                        null
                                    }
                                </td>
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