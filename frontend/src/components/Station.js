import React from 'react'
import { useSelector } from 'react-redux'

const Station = ({ station }) => {
  return <li>{station.nimi}</li>
}

const Stations = () => {
  const stations = useSelector(({ journeys, stations }) => stations)

  return (
    <ul>
      {stations.map((station) => (
        <Station key={station.id} station={station} />
      ))}
    </ul>
  )
}

export default Stations
