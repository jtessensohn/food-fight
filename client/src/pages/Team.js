import { Button, Card, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import "../css/team.css"
import { setTeam } from "../redux/actions";
import Fight from "../components/Fight";
import { Link } from "react-router-dom";

export default function Team() {
  const [teamData, setTeamData] = useState([])
  const [teamUsers, setTeamUsers] = useState([])
  const { id } = useParams()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);

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
      allUsers(id)
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
    <>
      {
        !user ? (<Link to='/login'>Please Log in :)</Link>) : (
          <div>
            <Row className="mt-3 col-12 mx-auto d-flex justify-content-around">
                <Card className={`col-5 teamMemberCard homePageCardBody ${theme === "light" ? "homePageCardBody" : "homePageCardBodyDark bg-dark text-light"}`}>
                <Card.Title className={`teamMemberCardTitle pb-0 ${theme === "light" ? "teamMemberCardTitle" : "teamMemberCardTitleDark"}`}>Team Name</Card.Title>
                <Card.Body className="mx-auto">
                  <div className="memberListItem p-3">
                    {teamData.name}
                  </div>
                </Card.Body>
              </Card>

              <Card className={`col-5 teamMemberCard homePageCardBody ${theme === "light" ? "homePageCardBody" : "homePageCardBodyDark bg-dark text-light"}`}>
                <Card.Title className={`teamMemberCardTitle pb-0 ${theme === "light" ? "teamMemberCardTitle" : "teamMemberCardTitleDark"}`}>Team Members</Card.Title>
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

            {user.TeamId !== teamData.id && (
              <div>
                <Button className="col-3 mx-auto joinButton mt-5" variant="dark" onClick={handleClick}>Join Team</Button>
                <Card className={`mt-5 mx-auto col-5 teamMemberCard homePageCardBody ${theme === "light" ? "homePageCardBody" : "homePageCardBodyDark bg-dark text-light"}`}>
                  <Card.Title className={`teamMemberCardTitle pb-0 ${theme === "light" ? "teamMemberCardTitle" : "teamMemberCardTitleDark"}`}>Team Fights</Card.Title>
                  <Card.Body>
                    <div className="memberList">
                      To see team fights join the team
                    </div>
                  </Card.Body>
                </Card>
              </div>
                )}

            {user.TeamId === teamData.id && (
              <Fight />
            )}
          </div>
        )
      }
    </>
  )
}
