import React, { useCallback, useEffect, useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    filterTeams()
  }

  function filterTeams() {
    console.log(teams)
    setTeams(teams.filter(team => team.name === text))
  }

  useEffect(() => {
    searchTeams()
  }, [setTeams])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search through Teams"
            aria-label="Search through Teams"
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
          return (
            <div key={team.id}>
              <Link to={`/team/${team.id}`}>
                <h2>{team.name}</h2>
              </Link>
            </div>
          )
        })
      )}
    </div>
  )
}
