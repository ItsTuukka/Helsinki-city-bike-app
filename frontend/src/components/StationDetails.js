import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import stationService from '../services/station'
import Button from 'react-bootstrap/Button'
// import { Wrapper } from '@googlemaps/react-wrapper'
// import { useRef } from 'react'

// this map component should work, no idea why it is not rendering
// so this do not work but wanted to left the code up

// const Map = ({ center, zoom }) => {
//   const ref = useRef()

//   useEffect(() => {
//     new window.google.maps.Map(ref.current, {
//       center,
//       zoom,
//     })
//   })

//   return <div ref={ref} id="map" />
// }

const InfoList = ({ station, padding }) => {
  return (
    <div style={padding}>
      <b>Journeys starting from the station:</b>
      <div>
        Total number: <i>{station.journeysFrom}</i>
        <br />
        Average distance: <i>{station.avgDistanceFrom} km</i>
        <br />
        Most popular return stations:
        <ul>
          {station.mostPopularReturnStations.map((name) => (
            <li key={name}>
              <i>{name}</i>
            </li>
          ))}
        </ul>
      </div>
      <br />
      <b>Journeys ending at the station:</b>
      <div>
        Total number: <i>{station.journeysTo}</i>
        <br />
        Average distance: <i>{station.avgDistanceTo} km</i>
        <br />
        Most popular return stations:
        <ul>
          {station.mostPopularDepartureStations.map((name) => (
            <li key={name}>
              <i>{name}</i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const StationDetails = () => {
  const [station, setStation] = useState()
  const [language, setLanguage] = useState('finnish')
  const id = useParams().id
  // const center = {
  //   lat: Number(station.y),
  //   lng: Number(station.x),
  // }

  useEffect(() => {
    if (!station) {
      getStation()
    }
  }, [])

  const getStation = async () => {
    const response = await stationService.getOne(id)
    setStation(response)
  }

  const handleChange = (e) => {
    setLanguage(e.target.value)
  }

  const style = {
    padding: 5,
    margin: 10,
  }

  const padding = {
    paddingTop: 10,
    paddingBottom: 20,
  }

  if (!station) {
    return (
      <div>
        <i>fetching data...</i>
      </div>
    )
  }

  return (
    <div style={style}>
      {language === 'finnish' ? (
        <div>
          <h2>{station.nimi}</h2>
          <div style={padding}>
            address: {station.osoite}, {station.kaupunki}
          </div>
        </div>
      ) : (
        <div>
          <h2>{station.namn}</h2>
          <div style={padding}>
            address: {station.address}, {station.stad}
          </div>
        </div>
      )}
      <InfoList {...{ station, padding }} />
      <div>
        <Button
          variant="outline-primary"
          onClick={handleChange}
          value="finnish"
        >
          Finnish
        </Button>
        <Button
          variant="outline-primary"
          onClick={handleChange}
          value="swedish"
        >
          Swedish
        </Button>
      </div>
      {/* <Wrapper apiKey={'apikey would go here'}>
        <Map center={center} zoom={4}></Map>
      </Wrapper> */}
    </div>
  )
}

export default StationDetails
