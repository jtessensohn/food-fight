import React from 'react'



export default function API() {
    const API_KEY = 'AIzaSyDYLXboALeQ2FniasTJingElKA0cTVvGMQ'
    
    const getRestInfo = (event) => {
        event.preventDefault()
        
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=chinese&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => console.log(data));

    }

    return (
        <div>
            
        </div>
    )
}
