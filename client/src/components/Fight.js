import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Card, Button, Row, Col, Container } from 'react-bootstrap'
import NewFightForm from './NewFightForm'
import '../css/fight.css'
import Map from './Map'
import { useSelector } from 'react-redux'
import '../css/winnerAnimation.scss'

export default function Fight() {
    const [teamRestaurants, setTeamRestaurants] = useState([])
    const [fight, setFight] = useState(null)
    const [fightRestaurants, setFightRestaurants] = useState([])
    const theme = useSelector((state) => state.theme);
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
                        <h2 className={`mb-5 ${theme === "light" ? "text-dark" : "text-light"}`}>Create a new fight!</h2>
                        <Card className={`fightPageCardBody px-3 newFightCardBody ${theme === "light" ? "fightPageCardBody" : "fightPageCardBodyDark"}`}>
                            <NewFightForm onFightCreated={getCurrentFight} />
                        </Card>
                    </Col>
                </Row>
            ) : (
                /* If fight has winner, display winner and create new fight button */
                fight.Winner ? (
                    <Row>
                        <Col>
                            <Row><h2 className={`col-12 ${theme === "light" ? "text-dark" : "text-light"}`}>Winner of <span className="fightName">{fight.name}</span> is </h2><h3 className="col-6 mx-auto"><span>{fight.Winner.Restaurant.name}</span></h3></Row>
                            <Card className={`fightPageCardBody fightPageWinnerCard ${theme === "light" ? "fightPageCard" : "fightPageCardDark"}`}>
                                {/* <Card.Title className={`fightPageCardTitle ${theme === "light" ? "fightPageCardTitle" : "fightPageCardTitle text-light"}`}>
                                    <div className={`winnerWord ${theme === "light" ? "winnerWord" : "winnerWordDark"}`}>
                                        Winner
                                    </div>
                                </Card.Title> */}
                                {/* <Card.Body className="winnerCardBody" style={{textTransform:'uppercase', fontWeight:'bold', fontSize:'15px'}}>{fight.Winner.Restaurant.name}
                                </Card.Body> */}
                                {/* Map component starts here */}
                                <Card className={`innerRestaurantCard col-10 m-5 p-5  p-3 mb-5  bg-dark mx-auto ${theme === "light" ? "innerRestaurantCard" : "innerRestaurantCardDark"}`}>
                                    <Map fightName={fight.name} />
                                </Card>
                                <Button className="fightPageButton col-4 mx-auto" onClick={resetButton}>New Fight</Button>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    /* else show active fight. */
                    <>
                        <Row>
                            <Col>
                                <h2 className={`mb-5 ${theme === "light" ? "text-dark" : "text-light"}`}>Fight: {fight.name}</h2>
                            </Col>
                        </Row>
                        <Row className="pb-5">
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Col sm={6}>
                                    <Card className={`fightPageCard waitingRestaurantsCard ${theme === "light" ? "fightPageCard" : "fightPageCardDark"}`}>
                                        <Card.Title className="fightPageCardTitle">Restaurants</Card.Title>
                                        <Droppable droppableId="restaurants">
                                            {(provided) => (
                                                <Card.Body className={`homePageCard m-5 ${theme === "light" ? "homePageCard bg-light text-dark" : "homePageCardDark bg-dark text-light"}`} {...provided.droppableProps} ref={provided.innerRef}> Drag and Drop restaurants into the fight box to select them.
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
                                    <Card className={`fightPageCard fightersArena ${theme === "light" ? "fightPageCard" : "fightPageCardDark"}`}>
                                        <Card.Title className="fightPageCardTitle">Fighters Arena</Card.Title>
                                        <Droppable droppableId="fight">
                                            {(provided) => (
                                                <Card.Body className={`homePageCard m-5 ${theme === "light" ? "homePageCard bg-light text-dark" : "homePageCardDark bg-dark text-light"}`} {...provided.droppableProps} ref={provided.innerRef}>
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
                    </>
                )
            )}
        </Container>
    )
}