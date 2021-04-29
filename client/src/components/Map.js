import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyDYLXboALeQ2FniasTJingElKA0cTVvGMQ"
  // })

  // const RenderMap = () => {
  //   const onLoad = React.useCallback(
  //     function onLoad (mapInstance) {} , []
  //   )
  // }

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDYLXboALeQ2FniasTJingElKA0cTVvGMQ"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map