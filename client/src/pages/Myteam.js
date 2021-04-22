import React, { useState, useEffect } from 'react'
import { Card, ListGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


export default function Myteam() {
    const user = useSelector((state) => state.user);
    // make a hook
    const [usersTeams, setUsersTeams] = useState([])
    // make a arrow function for fetch

    const getTeams = () => {
        // fetch api
        fetch('/api/v1/teams/')
            .then((res) => res.json())
            .then((data) => {
                // store the data in a hook(state)
                setUsersTeams(data)
                console.log(data)
            })
    }
    //useEffect to show teams on load
    useEffect(() => {
        getTeams()
    }, [])

    return (
        <div>
            <h1>{user.username} teams</h1>
        {usersTeams.map((team) => {
            return (
            <div key={team.id}>
                <Row className="justify-content-center mx-auto">
                    <Card className="col-3">
                        <Card.Header>{team.name}</Card.Header>
                        <ListGroup variant="flush">
                            <Link>{team.Users.username}</Link>
                        </ListGroup>
                    </Card>
                </Row>
            </div>

            )
        })}
        </div>
    )
}
