import React from 'react'
import { useEffect } from 'react'
import stationService from './services/station'
import { useDispatch } from 'react-redux'
import { setStations } from './reducers/stationReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homeview from './components/Home'
import Stationlist from './components/Stationlist'
import JourneyTable from './components/JourneyTable'
import StationDetails from './components/StationDetails'
import NavigationBar from './components/NavigationBar'

const App = () => {
  const dispatch = useDispatch()

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
          <Route path="/" element={<Homeview />} />
          <Route
            path="/stations"
            element={
              <>
                <Stationlist />
              </>
            }
          />
          <Route path="/stations/:id" element={<StationDetails />} />
          <Route path="/journeys" element={<JourneyTable />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
