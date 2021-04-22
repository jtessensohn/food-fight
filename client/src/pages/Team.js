import { Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useSelector } from "react-redux";

export default function Team() {
  const user = useSelector((state) => state.user);
  const [team, setTeam] = useState([])
  const { id } = useParams()

  const getTeamById = () => {
    fetch(`/api/v1/teams/${id}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
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
    })
  }


  useEffect(() => {
    getTeamById()
  }, [setTeam])

  return (
    <div>
      team time {team.name}
      <br />
      <Button variant="dark" onClick={handleClick}>Join Team</Button>
    </div>
  )
}
