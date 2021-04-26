import { Button, Card, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useSelector, useStore } from "react-redux";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "../css/team.css"

export default function Team() {
  const [team, setTeam] = useState([])
  const [teamUsers, setTeamUsers] = useState([])
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


  useEffect(() => {
    getTeamById()
    allUsers()
  }, [setTeam, setTeamUsers])

  return (
    <div>
      <Navigation />
      <Row className="mt-3">
        <Row className="col-6">
          <h1 className="col-12 p-0 my-auto teamNameTeamPage">{team.name}</h1>
          <Button className="col-3 mx-auto my-auto joinButton" variant="dark" onClick={handleClick}>Join Team</Button>
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
      <Footer />
    </div>
  )
}
