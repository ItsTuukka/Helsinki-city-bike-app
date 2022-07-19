import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import stationService from '../services/station'
import Button from 'react-bootstrap/Button'

const StationDetails = () => {
  const [station, setStation] = useState('')
  const [language, setLanguage] = useState('finnish')
  const id = useParams().id

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
        <br></br>
        <i>this should only take few seconds</i>
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
      <div style={padding}>
        Total number of journeys stating from the station:{' '}
        <i>{station.journeysFrom}</i>
        <br></br>
        Total number of journeys ending at the station:{' '}
        <i>{station.journeysTo}</i>
      </div>
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
    </div>
  )
}

export default StationDetails
