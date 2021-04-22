import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'

export default function SearchBar() {
  const [text, setText] = useState('')
  const [teams, setTeams] = useState([])
  const searchTeams = () => {
    console.log('submitted')
    fetch('/api/v1/teams', {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        setTeams(data)
      })
  }

  useEffect(() => {
    searchTeams()
  }, [setTeams])

  return (
    <div>
      <form>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for a Team"
            aria-label="Search for a Team"
            aria-describedby="basic-addon2"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <InputGroup.Append>
            <Button variant="dark">Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </form>
      {!teams ? ('') : (
        teams.map(team => {
          return(
            <div key={team.id}>
              <h2>{team.name}</h2>
            </div>
          )
        })
      )}
    </div>
  )
}
