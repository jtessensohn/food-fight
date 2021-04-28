import { Button, Card, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useDispatch } from "react-redux";
import "../css/team.css"
import { setTeam } from "../redux/actions";
import Fight from "../components/Fight";

export default function Team() {
  const [teamData, setTeamData] = useState([])
  const [teamUsers, setTeamUsers] = useState([])
  const { id } = useParams()
  const dispatch = useDispatch();

  const getTeamById = (teamId) => {
    fetch(`/api/v1/teams/${teamId}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        setTeamData(data)
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

  const allUsers = (teamId) => {
    console.log('all users are belong to us')
    fetch('/api/v1/users')
      .then(res => res.json())
      .then(data => {
        const userResults = data.filter(user => user.TeamId === parseInt(teamId))
        setTeamUsers(userResults)
        console.log(data)
      })
  }

  useEffect(() => {
    getTeamById(id)
    allUsers(id)
  }, [ id ])

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

      <Fight />
      <Footer />
    </div>
  )
}

}
