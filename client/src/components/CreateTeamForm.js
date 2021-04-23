import React, { useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { useHistory } from 'react-router'

export default function CreateTeamForm() {
  const history = useHistory()
  const [text, setText] = useState('')

  const createTeam = () => {
    console.log('Creating Team')
    fetch('/api/v1/teams', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: text
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error)
        } else {
          fetch(`/api/v1/users/team`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: data.id
            })
          })
          .then(history.push(`/team/${data.id}`))
        }
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createTeam()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Create a Team"
            aria-label="Create a Team"
            aria-describedby="basic-addon2"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <InputGroup.Append>
            <Button variant="dark">Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </form>
    </div>
  )
}
