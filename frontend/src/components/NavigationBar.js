import React from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  const padding = {
    padding: 7,
  }

  return (
    <div>
      <Link style={padding} to="/">
        home
      </Link>
      <Link style={padding} to="/stations">
        stations
      </Link>
      <Link style={padding} to="/journeys">
        journeys
      </Link>
    </div>
  )
}

export default NavigationBar
