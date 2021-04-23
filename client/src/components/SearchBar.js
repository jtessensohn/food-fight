
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, FormControl, InputGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../css/searchbar.css"

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
    <div className="mx-5">
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
      <Row>

      {!teams ? ('') : (
        teams.map(team => {
          return (
            <Card className="col-3 mx-auto mb-2 teamCard" key={team.id}>
              <Card.Body className="p-2">
                <Link className="teamLink" to={`/team/${team.id}`}>
                  <h3 className="teamName">{team.name}</h3>
                </Link>
              </Card.Body>
            </Card>
          )
        })
        )}
      </Row>
    </div>
  )
}
