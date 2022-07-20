import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Station = ({ station }) => {
  const style = {
    padding: 3,
    margin: 5,
  }
  return (
    <li style={style}>
      <Link to={`/stations/${station.id}`}>{station.nimi}</Link>
    </li>
  )
}

const Stationlist = () => {
  const stations = useSelector(({ stations }) => stations)
  const filter = useSelector(({ filter }) => filter)
  const filteredStations = stations
    .filter(
      (station) =>
        station.nimi.toLowerCase().includes(filter.toLowerCase()) ||
        station.namn.toLowerCase().includes(filter.toLowerCase()) ||
        station.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => a.nimi.localeCompare(b.nimi))

  return (
    <ul>
      {filteredStations.map((station) => (
        <Station key={station.id} station={station} />
      ))}
    </ul>
  )
}

export default Stationlist
