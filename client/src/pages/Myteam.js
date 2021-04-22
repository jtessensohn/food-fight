import React from 'react'
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap'

export default function Myteam() {
    return (
        <div> 
            <h1>Team name goes here</h1>
            <Container >
            <Row className="justify-content-center mx-auto">
            <Col>
            <Card className="col-3">
                <Card.Header>Team Members</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>name</ListGroup.Item>
                    <ListGroup.Item>name</ListGroup.Item>
                    <ListGroup.Item>name</ListGroup.Item>
                </ListGroup>
            </Card>
            </Col>
            </Row>
            <Row className="justify-content-center mx-auto">
            <Col>
            <Card className="col-3">
                <Card.Header>Restaurants</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>name</ListGroup.Item>
                    <ListGroup.Item>name</ListGroup.Item>
                    <ListGroup.Item>name</ListGroup.Item>
                </ListGroup>
            </Card>
            </Col>
            </Row>
            </Container>
        </div>
    )
}
