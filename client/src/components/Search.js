import React, { useEffect, useState } from 'react'
import { Button, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import CreatableSelect from 'react-select/creatable';
import '../css/search.css'

export default function Search() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ options, setOptions ] = useState([]);
    const [ value, setValue ] = useState(null);
    const [teams, setTeams] = useState([]);
    const history = useHistory();

    const searchTeams = () => {
        fetch('/api/v1/teams', {
          method: "GET"
        })
          .then(res => res.json())
          .then(data => {
            setTeams(data)
          })
      }

      const handleChange = (value) => {
        console.log(value);
        setValue(value);
      }

      const createOptions = (teams) => {
        return teams.map(team => {
            return {
                label: team.name,
                value: team.id
            }
        })
      }

      const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`/api/v1/users/team`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: value.value
            })
          })
          .then(history.push(`/team/${value.value}`))
      }
      
      const handleCreate = async (value) => {
        setIsLoading(true);
        const newTeam = await fetch('/api/v1/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: value
            })
            }).then(res => res.json())
        if (newTeam.error) {
            alert(newTeam.error)
        } else {
            setTeams([...teams, newTeam])
            setValue({label: newTeam.name, value: newTeam.id})
        }
        setIsLoading(false);
      };
    
      useEffect(() => {
        setOptions(createOptions(teams))
      }, [teams])

      useEffect(() => {
        searchTeams()
      }, [setTeams])

    return (
        <div className="mb-5">
            <form onSubmit={handleSubmit}>
              <Row className="col-8 justify-content-around mx-auto my-auto">
                <CreatableSelect
                    className="search col-9 my-auto"
                    placeholder="Create Or Pick Your Team"
                    isClearable
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    onChange={handleChange}
                    onCreateOption={handleCreate}
                    formatCreateLabel = {(value) => `Create team "${value}"`}
                    options={options}
                    value={value}
                    menuPlacement='top'
                />
                <Button type="submit" className="searchButton col-2" sz="lg">Join</Button>
              </Row>
            </form>
        </div>
    )
}
