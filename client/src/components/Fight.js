import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Card, Button, Row, Col, Container } from 'react-bootstrap'
import NewFightForm from './NewFightForm'
import '../css/fight.css'

export default function Fight() {
    const [teamRestaurants, setTeamRestaurants] = useState([])
    const [fight, setFight] = useState(null)
    const [fightRestaurants, setFightRestaurants] = useState([])

    const getCurrentFight = () => {

        fetch('/api/v1/fights/current')
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                    return
                }
                setFight(data)
                setFightRestaurants(data.Restaurants)
                const competitors = data.Restaurants
                fetch('/api/v1/restaurants')
                    .then(res => res.json())
                    .then(restaurants => {
                        const filteredRestaurants = restaurants.filter((restaurant) => {
                            return !competitors.some((competitor) => {
                                return competitor.id === restaurant.id
                            })
                        })
                        setTeamRestaurants(filteredRestaurants)
                    })
            })
    }
    const resetButton = (e) => {
        setFight(null)
    }

    async function handleOnDragEnd(result) {
        if (!result.destination) return;
        const state = {
            restaurants: Array.from(teamRestaurants),
            fight: Array.from(fightRestaurants)
        }
        const source = result.source.droppableId
        const destination = result.destination.droppableId
        const [reorderedItem] = state[source].splice(result.source.index, 1)
        state[destination].splice(result.destination.index, 0, reorderedItem)

        setTeamRestaurants(state.restaurants)
        setFightRestaurants(state.fight)
        try {
            // try to send update to backend
            if (result.destination.droppableId === "fight") {
                // if it is dragged to the fight column, add competitor to fight
                await fetch(`/api/v1/fights/${fight.id}/competitors/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: result.draggableId
                    })
                }).then(res => res.json())
                    .then(data => {
                        if (data.error) throw data.error
                    })
            } else if (result.destination.droppableId === "restaurants") {
                // if it is dragged to the restaurants column, remove competitor from fight
                await fetch(`/api/v1/fights/${fight.id}/competitors/${result.draggableId}`, {
                    method: "DELETE"
                }).then(res => res.json())
                    .then(data => {
                        if (data.error) throw data.error
                    })
            }
        } catch (error) {
            alert(error)
            getCurrentFight()
            return;
        }
    }

    const initiateFight = (e) => {
        fetch('/api/v1/fights/current/winner')
            .then(res => res.json())
            .then(data => {
                getCurrentFight()
            })
    }

    useEffect(() => {
        getCurrentFight()
    }, [])

    return (
        <Container className="mt-5">
            {/* If there is no fight, display new fight form*/}
            {!fight ? (
                <Row>
                    <Col>
                        <Card className="fightPageCardBody px-3 newFightCardBody">
                            <Card.Title className="fightPageCardTitle">Create a new fight!</Card.Title>
                            <NewFightForm onFightCreated={getCurrentFight} />
                        </Card>
                    </Col>
                </Row>
            ) : (
                /* If fight has winner, display winner and create new fight button */
                fight.Winner ? (
                    <Row>
                        <Col>
                            <h2>{fight.name}</h2>
                            <Card className="fightPageCardBody fightPageWinnerCard">
                                <Card.Title className="fightPageCardTitle">
                                    <div className="winnerWord">
                                        Winner
                                    </div>
                                </Card.Title>
                                <Card.Body className="winnerCardBody">{fight.Winner.Restaurant.name}
                                </Card.Body>
                                <Button className="fightPageButton col-4 mx-auto" onClick={resetButton}>New Fight</Button>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    /* else show active fight. */
                    <>

                    <Row>
                        <Col>
                            <h2>{fight.name}</h2>
                        </Col>
                        </Row>
                        <Row className="mb-5">
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Col sm={6}>
                            <Card className="fightPageCard">
                                <Card.Title className="fightPageCardTitle">Restaurants</Card.Title>
                                <Droppable droppableId="restaurants">
                                    {(provided) => (
                                        <Card.Body className="fightPageCardBody" {...provided.droppableProps} ref={provided.innerRef}> Drag and Drop restaurants into the fight box to select them.
                                            <br />
                                            <br />
                                            {teamRestaurants.map((restaurant, index) => {
                                                return (
                                                    <Draggable key={restaurant.id} draggableId={restaurant.id.toString()} index={index}>
                                                        {(provided) => (
                                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                                {restaurant.name}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </Card.Body>
                                        
                                    )}
                                </Droppable>
                            </Card>
                            </Col>
                            <Col sm={6}>
                            <Card className="fightPageCard">

                                <Droppable droppableId="fight">
                                    {(provided) => (
                                        <Card.Body className="fightPageCardBody" {...provided.droppableProps} ref={provided.innerRef}>
                                            {fightRestaurants.map((restaurant, index) => {
                                                return (
                                                    <Draggable key={restaurant.id} draggableId={restaurant.id.toString()} index={index}>
                                                        {(provided) => (
                                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                                {restaurant.name}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </Card.Body>
                                    )}
                                </Droppable>
                                <Button className="fightPageButton" onClick={initiateFight}>Fight</Button>
                                {/* or
                                <Button>Random and vote between two</Button> */}

                            </Card>
                            </Col>
                        </DragDropContext>
                        </Row>
                        <Row>
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Col sm={6}>
                                    <Card>
                                        <Card.Title>Restaurants</Card.Title>
                                        <Droppable droppableId="restaurants">
                                            {(provided) => (
                                                <Card.Body {...provided.droppableProps} ref={provided.innerRef}> Drag and Drop restaurants into the fight box to select them.
                                                    <br />
                                                    <br />
                                                    {teamRestaurants.map((restaurant, index) => {
                                                        return (
                                                            <Draggable key={restaurant.id} draggableId={restaurant.id.toString()} index={index}>
                                                                {(provided) => (
                                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                                        {restaurant.name}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    })}
                                                    {provided.placeholder}
                                                </Card.Body>

                                            )}
                                        </Droppable>
                                    </Card>
                                </Col>
                                <Col sm={6}>
                                    <Card >

                                        <Droppable droppableId="fight">
                                            {(provided) => (
                                                <Card.Body {...provided.droppableProps} ref={provided.innerRef}>
                                                    {fightRestaurants.map((restaurant, index) => {
                                                        return (
                                                            <Draggable key={restaurant.id} draggableId={restaurant.id.toString()} index={index}>
                                                                {(provided) => (
                                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                                        {restaurant.name}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    })}
                                                    {provided.placeholder}
                                                </Card.Body>
                                            )}
                                        </Droppable>
                                        <Button onClick={initiateFight}>Fight</Button>
                                    </Card>
                                </Col>
                            </DragDropContext>
                        </Row>
                    </>
                )

            )}

        </Container>
    )
}
