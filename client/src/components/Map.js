import React, { useRef, useState } from 'react'
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

const containerStyle = {
  width: 'auto',
  height: '50vh',
  boxShadow: '0px 0px 3px 0px black'
};

const places = ["places"]



function Map(props) {
 
  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523
  })
  const [text, setText] = useState()
  const searchBox = useRef()
  const map = useRef()


  const onMapLoad = ref => map.current = ref
  const onLoad = ref => searchBox.current = ref

  const onPlacesChanged = () => {
    const places = searchBox.current.getPlaces()
    console.log(places)
    if (places.length >= 1) {
      setCenter(places[0].geometry.location)
    }
  }





  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDYLXboALeQ2FniasTJingElKA0cTVvGMQ"
      libraries={places}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onMapLoad}
      >
        <Marker
          position={center}
        />
        <StandaloneSearchBox onLoad={onLoad} options={{}} onPlacesChanged={onPlacesChanged}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Find a place"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "60%",
              bottom: "92.8%",
              marginLeft: "-120px"
            }}
          />
        </StandaloneSearchBox>
      
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map