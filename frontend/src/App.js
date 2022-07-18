import React from 'react'
import { useEffect } from 'react'
import journeyService from './services/journey'
import stationService from './services/station'
import { setJourneys } from './reducers/journeyReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setStations } from './reducers/stationReducer'
import Stations from './components/Station'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    journeyService.getAll().then((journeys) => dispatch(setJourneys(journeys)))
  }, [dispatch])

  useEffect(() => {
    stationService.getAll().then((stations) => dispatch(setStations(stations)))
  }, [dispatch])

  return (
    <div className="container">
      <h2>Helsinki city bike app</h2>
      <Stations />
    </div>
  )
}

export default App
