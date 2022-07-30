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
        body: JSON.stringify({ eventId: currentEvent, username: username })
    }).then((response) => response.json())
        .then(json => {
            setData(data.filter((event) => event._id !== currentEvent));
        });
}

export default function Overview() {
    const [data, setData] = useState([]);
    const currentUser = useSelector(state => state.isLoggedIn?.username);

    useEffect(() => {
        getOverview(setData)
    }, []);

    return (
        <div className="overview centered w-100">
            <h1 className="text-center mb-5">Events Overview</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <td>User</td>
                        <td>Event</td>
                        <td>Date</td>
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
                                <td>{currentUser === event.user
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
                    })}
                </tbody>
            </Table>
        </div>
    )
}
