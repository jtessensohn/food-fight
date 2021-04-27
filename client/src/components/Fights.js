import React, { useState } from 'react'

export default function Fights(props) {
    const [fightName, setFightName] = useState({
        name: ''
    })

    const createFight = (event) => {
        event.preventDefault()
        fetch('/api/v1/fights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: fightName.name,
            })
        })
            .then(res => res.json())
            .then(data => {
                setFightName(data)
            })
    }

    const handleChange = (event) => {
        setFightName({
            ...fightName,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>

            <form className="form-login" onSubmit={createFight}>
                <div className="form-label-group">
                    <input onChange={handleChange} type="text" id="inputname" className="form-control" placeholder="name" value={fightName.name} name="name" required autoFocus />
                    <label htmlFor="inputname">Fight name</label>
                    <button type='submit'>add fight name</button>
                </div>
            </form>
        </div>
    )
}
