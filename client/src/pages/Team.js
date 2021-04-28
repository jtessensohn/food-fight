import { Button, Card, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useDispatch } from "react-redux";
import Navigation from "../components/Navigation";
import "../css/team.css"
import { setTeam } from "../redux/actions";
import Fight from "../components/Fight";

export default function Team() {
  const [teamData, setTeamData] = useState([])
  const [teamUsers, setTeamUsers] = useState([])
  const { id } = useParams()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

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
  }, [id])

  
  return (
    <div>
      <Row className="mt-3 col-12">
        <Row className="col-6">
          <h1 className="col-12 p-0 my-auto teamNameTeamPage">{teamData.name}</h1>
          {user.TeamId !== teamData.id && (
            <Button className="col-3 mx-auto my-auto joinButton" variant="dark" onClick={handleClick}>Join Team</Button>
          )}
        </Row>
        <Card className="col-6 teamMemberCard">
          <Card.Title className="teamMemberCardTitle pb-0">Team Members</Card.Title>
          <Card.Body>
            <div className="memberList">
              {teamUsers.map(teamUser => {
                return (<div className="memberListItem p-3" key={teamUser.id}>
                  {teamUser.username}
                </div>
                )
              })}
            </div>
          </Card.Body>
        </Card>
      </Row>
      {user.TeamId === teamData.id && (
        <Fight />
      )}
    </div>
  )
}
