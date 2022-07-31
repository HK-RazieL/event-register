import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap"

const getOverview = (setData) => {
    fetch("/overview")
        .then(res => res.json())
        .then(json => {
            setData(json);
        });
}

const cancelRegistration = (currentEvent, username, data, setData) => {
    fetch("/overview", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ eventId: currentEvent, currentUser: username })
    }).then((response) => response.json())
        .then(json => {
            setData(data.filter((event) => event._id !== currentEvent));
        });
}

export default function Overview() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("All");
    const currentUser = useSelector(state => state.isLoggedIn?.username);

    useEffect(() => {
        getOverview(setData)
    }, []);

    return (
        <div className="overview centered w-100">
            <h1 className="text-center mb-5">Events Overview</h1>
            <select className="standard-button-height" onChange={(e) => setFilter(e.target.value)}>
                <option>All</option>
                <option>Annual party</option>
                <option>Intro course to React.js</option>
                <option>Learning in databases</option>
            </select>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <td>User</td>
                        <td>Event</td>
                        <td>Date of event</td>
                        <td>Description</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((event, index) => {
                        if (filter === "All" || filter === event.eventName) {
                            return (
                                <tr key={index}>
                                    <td>{event.currentUser}</td>
                                    <td>{event.eventName}</td>
                                    <td>{event.date}</td>
                                    <td>{event.description}</td>
                                    <td>{currentUser === event.currentUser
                                        ? <Button
                                            variant="outline-danger"
                                            onClick={() => {
                                                return cancelRegistration(event._id, currentUser, data, setData);
                                            }}
                                            style={{ width: "100%" }}
                                        >X</Button>
                                        : ""}</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </Table>
        </div>
    )
}
