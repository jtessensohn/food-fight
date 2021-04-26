import { Button, Card, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "../css/team.css"

export default function Team() {
  const [team, setTeam] = useState([])
  const [teamUsers, setTeamUsers] = useState([])
  const [teamRestaurants, setTeamRestaurants] = useState([])
  const [fightRestaurants, setFightRestaurants] = useState([])
  const { id } = useParams()

  const getTeamById = () => {
    fetch(`/api/v1/teams/${id}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        setTeam(data)
      })
  }

  const handleClick = () => {
    console.log('clicked')
    fetch(`/api/v1/users/team`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    }).then(() => allUsers())

  }

  const allUsers = () => {
    console.log('all users are belong to us')
    fetch('/api/v1/users')
      .then(res => res.json())
      .then(data => {
        const userResults = data.filter(user => user.TeamId === parseInt(id))
        setTeamUsers(userResults)
        console.log(data)
      })
  }

  const getRestaurant = () => {
    fetch('/api/v1/restaurants')
      .then(res => res.json())
      .then(data => {
        setTeamRestaurants(data)
      })
  }

  useEffect(() => {
    getTeamById()
    allUsers()
    getRestaurant()
  }, [setTeam, setTeamUsers])


function handleOnDragEnd(result) {
  if(!result.destination) return;
console.log(result)
const state = {
  restaurants:Array.from(teamRestaurants),
  fight:Array.from(fightRestaurants)
}
const source = result.source.droppableId
const destination = result.destination.droppableId
const [reorderedItem] = state[source].splice(result.source.index, 1)
  state[destination].splice(result.destination.index, 0, reorderedItem)

  setTeamRestaurants(state.restaurants)
  setFightRestaurants(state.fight)
}



  return (
    <div>
      <Navigation />
      <Row className="mt-3">
        <Row className="col-6">
          <h1 className="col-12 teamName">{team.name}</h1>
          <Button className="col-3 mx-auto joinButton" variant="dark" onClick={handleClick}>Join Team</Button>
        </Row>
        <Card className="col-6 teamMemberCard">
          <Card.Title className="teamMemberCardTitle pb-0">Team Members</Card.Title>
          <Card.Body>
            <div className="memberList">
              {teamUsers.map(user => {
                return (<div className="memberListItem p-3">
                  {user.username}
                </div>
                )
              })}
            </div>
          </Card.Body>
        </Card>
      </Row>





      <Row>
          <DragDropContext onDragEnd={handleOnDragEnd}>
        <Card className="col-4 mx-auto ">
          <Card.Title>Restaurants</Card.Title>
            <Droppable droppableId="restaurants">
              {(provided) => (
                <Card.Body {...provided.droppableProps} ref={provided.innerRef}>
                  {teamRestaurants.map((restaurant, index) => {
                    return (
                      <Draggable key={restaurant.id} draggableId={restaurant.id.toString()} index={index}>
                        {(provided) => (
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <ul>
                        {restaurant.name}
                        </ul>
                      </div>
                        )}
                      </Draggable>
                    )
                  })}
                </Card.Body>
              )}
            </Droppable>
        </Card>



        <Card className="col-6">
          <Card.Title>Fights</Card.Title>
            <Droppable droppableId="fight">
              {(provided) => (
                <Card.Body {...provided.droppableProps} ref={provided.innerRef}>
                  {fightRestaurants.map((restaurant, index) => {
                    return (
                      <Draggable key={restaurant.id} draggableId={restaurant.id.toString()} index={index}>
                        {(provided) => (
                      <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <ul>
                        {restaurant.name}
                        </ul>
                      </div>
                        )}
                      </Draggable>
                    )
                  })}
                </Card.Body>
              )}
            </Droppable>
        </Card>
          </DragDropContext>
      </Row>
      <Footer />
    </div>
  )
}
