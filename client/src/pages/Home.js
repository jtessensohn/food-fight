import React from 'react'
import Logo from '../images/Logo.png'
import '../css/Logo.css'

export default function Home() {
    return (
        <div>
            <img className="logo"src={Logo} alt='Food-fight-logo.png'></img>
        </div>
    )
}
