import { Button, Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useSelector, useStore } from "react-redux";

export default function Team() {
  const user = useSelector((state) => state.user);
  const [team, setTeam] = useState([])
  const [teamUsers, setTeamUsers] = useState ([])
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
      <h1>Team: {team.name}</h1>
      {teamUsers.map(user => {
       return (<div>
         <Card>
           {user.username}
         </Card>
       </div>
       )
      })}
      <br />
      <Button variant="dark" onClick={handleClick}>Join Team</Button>
    </div>
  )
}
