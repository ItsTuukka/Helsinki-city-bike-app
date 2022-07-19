import React from 'react'
import { useEffect } from 'react'
import journeyService from './services/journey'
import stationService from './services/station'
import { setJourneys } from './reducers/journeyReducer'
import { useDispatch } from 'react-redux'
import { setStations } from './reducers/stationReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Stations from './components/Station'
import Filter from './components/Filter'
import StationDetails from './components/StationDetails'
import NavigationBar from './components/NavigationBar'

const Home = () => (
  <div>
    <h2> Helsinki city bike app </h2>
  </div>
)

const Journeys = () => (
  <div>
    <h2> coming soon </h2>
  </div>
)

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    journeyService.getAll().then((journeys) => dispatch(setJourneys(journeys)))
  }, [dispatch])

  useEffect(() => {
    stationService.getAll().then((stations) => dispatch(setStations(stations)))
  }, [dispatch])

  return (
    <Router>
      <div className="container">
        <div>
          <NavigationBar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/stations"
            element={
              <>
                <Filter />
                <Stations />
              </>
            }
          />
          <Route path="/stations/:id" element={<StationDetails />} />
          <Route path="/journeys" element={<Journeys />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
