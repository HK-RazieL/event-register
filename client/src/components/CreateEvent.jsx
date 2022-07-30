import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Form from "react-bootstrap/Form";

const createEvent = (data, setResponse) => {
    if (data.event === "-----" || data.event === "") {
        setResponse("Please select an event type.");
        return;
    };

    if (typeof (data.date) === "null") {
        setResponse("Please select a date.");
        return;
    };

    fetch("/create-event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res)
        .then(json => {
            if (json.status === 200) {
                setResponse(`You have successfully created an event "${data.eventName}".`);
            } else {
                setResponse(`You were not able to create the event.`);
            }
        });
}

export function EventRegistration() {
    const username = useSelector((state) => state.isLoggedIn?.username);
    const [data, setData] = useState({
        host: username,
        eventName: "",
        date: null,
        description: ""
    });
    const [response, setResponse] = useState("");

    return (
        <div className="create-event-form centered">
            <Form className="mb-3" method="POST" onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                createEvent(data, setResponse);
            }}>
                <h2 className="mb-4">Register an event</h2>
                <Form.Group>
                    <Form.Label>Event Type</Form.Label>
                    <select
                    required
                    className="standard-button-height" onChange={(e) => {
                        setData({
                            ...data,
                            eventName: e.target.value
                        })
                    }} >
                        <option>-----</option>
                        <option>Annual party</option>
                        <option>Intro course to React.js</option>
                        <option>Learning in databases</option>
                    </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date and Time</Form.Label>
                    <input type="datetime-local" required onChange={(e) => {
                        setData({
                            ...data,
                            date: e.target.value
                        })
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <textarea
                    rows="10"
                    cols="50"
                    style={{ resize: "none" }}
                    required
                    onChange={(e) => {
                        setData({
                            ...data,
                            description: e.target.value
                        })
                    }} />
                </Form.Group>
                <input className="standard-button-height" type="submit" value="Create" />
            </Form>
            {response ? <div className="d-flex text-center justify-content-center">{response}</div> : null}
        </div>
    )
}

export default EventRegistration;