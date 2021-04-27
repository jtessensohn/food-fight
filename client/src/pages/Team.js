import { Button, Card, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useDispatch } from "react-redux";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "../css/team.css"
import { setTeam } from "../redux/actions";
import Fights from "../components/Fights";

export default function Team() {
  const [teamData, setTeamData] = useState([])
  const [teamUsers, setTeamUsers] = useState([])
  const [teamRestaurants, setTeamRestaurants] = useState([])
  const [fight, setFight] = useState(null)
  const [fightRestaurants, setFightRestaurants] = useState([])
  const [isClicked, setIsClicked] = useState('NOT_CLICKED')
  const [winningRestaurant, setWinningRestaurant] = useState([])
  const { id } = useParams()
  const dispatch = useDispatch();

  const getTeamById = () => {
    fetch(`/api/v1/teams/${id}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        setTeamData(data)
      })
  }

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
    }).then(() => {
      dispatch(setTeam(+id))
      allUsers()
    })

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


  useEffect(() => {
    getTeamById()
    allUsers()
    getCurrentFight()
  }, [setTeam, setTeamUsers])


  async function handleOnDragEnd(result) {
    if (!result.destination) return;
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
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const initiateFight = (e) => {
    setIsClicked('CLICKED')
    e.preventDefault()
    // console.log('fighting')
    const winning = getRandomInt(0, fightRestaurants.length)
    setWinningRestaurant(fightRestaurants[winning])
  }

  const resetButton = (e) => {
    setIsClicked('NOT_CLICKED')
    e.preventDefault()
    setFightRestaurants([])
  }



  return (
    <div>
      <Navigation />
      <Row className="mt-3">
        <Row className="col-6">
          <h1 className="col-12 p-0 my-auto teamNameTeamPage">{teamData.name}</h1>
          <Button className="col-3 mx-auto my-auto joinButton" variant="dark" onClick={handleClick}>Join Team</Button>
        </Row>
        <Card className="col-6 teamMemberCard">
          <Card.Title className="teamMemberCardTitle pb-0">Team Members</Card.Title>
          <Card.Body>
            <div className="memberList">
              {teamUsers.map(user => {
                return (<div className="memberListItem p-3" key={user.id}>
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
                </Card.Body>
              )}
            </Droppable>
          </Card>



          <Card className="col-6 m-3 mr-">
            {fight ? (
              fight.WinnerId ? (
                <div>
                  <Card.Title>Winner</Card.Title>
                  <Card.Body>{fight.Winner.Restaurant.name}
                    <br></br>
                    <br></br>
                    <Button onClick={resetButton}>Reset</Button>
                  </Card.Body>
                </div>
              ) : (
                <>
                  <Card.Title>{fight.name}</Card.Title>
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
                      </Card.Body>
                    )}
                  </Droppable>
                  <Button onClick={initiateFight}>Fight</Button>
                  or
                  <Button>Random and vote between two</Button>
                </>


              )
            ) : (
              <Fights />
            )}
          </Card>
        </DragDropContext>
      </Row>
      <Footer />
    </div>
  )
}
