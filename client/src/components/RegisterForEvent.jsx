import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Form from "react-bootstrap/Form";

const eventRegistrationAction = (selectedEvent, username, setResponse) => {
    if (selectedEvent === "-----" || selectedEvent === "") {
        setResponse("Please select an event.");
        return;
    };

    fetch("/register-for-event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ event: selectedEvent, user: username, date: new Date, description: "" })
    })
        .then(res => res)
        .then(json => {
            if (json.status === 200) {
                setResponse(`You have successfully registered for the event "${selectedEvent}".`);
            } else {
                setResponse(`You were not able to register for the event "${selectedEvent}".`);
            }
        });
}

export function EventRegistration() {
    const [selectedEvent, setSelectedEvent] = useState("");
    const [response, setResponse] = useState("");
    const username = useSelector((state) => state.isLoggedIn?.username);

    return (
        <div className="event-register-form centered">
            <h2 className="mb-4">Register for event</h2>
            <Form className="mb-3" method="POST" onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                eventRegistrationAction(selectedEvent, username, setResponse);
            }}>
                <select
                className="standard-button-height"
                onChange={(e) => {
                    setSelectedEvent(e.target.selectedOptions[0].innerText);
                }}>
                    <option>-----</option>
                    <option>Annual party</option>
                    <option>Intro course to React.js</option>
                    <option>Learning in databases</option>
                </select>
                <input className="standard-button-height" type="submit" value="Register" />
            </Form>
            {response ? <div>{response}</div> : null}
        </div>
    )
}

export default EventRegistration;