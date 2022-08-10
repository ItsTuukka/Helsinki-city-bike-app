import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pagination } from '@mui/material'
import Filter from './StationFilter'

const Station = ({ station }) => {
  const style = {
    padding: 3,
    margin: 5,
  }
  return (
    <li style={style} className="station">
      <Link to={`/stations/${station.id}`} id="stationLink">
        {station.nimi}
      </Link>
    </li>
  )
}

const Stationlist = () => {
  const [page, setPage] = useState(1)
  const stations = useSelector(({ stations }) => stations)
  const filter = useSelector(({ stationFilter }) => stationFilter)
  const filteredStations = stations
    .filter(
      (station) =>
        station.nimi.toLowerCase().includes(filter.toLowerCase()) ||
        station.namn.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => a.nimi.localeCompare(b.nimi))

  const handlePageChange = (e, value) => {
    setPage(value)
  }

  return (
    <div>
      <br />
      <Pagination
        count={10}
        variant="outlined"
        page={page}
        onChange={handlePageChange}
      />
      <br />
      <Filter />
      <ul>
        {filter
          ? filteredStations.map((station) => (
              <Station key={station.id} station={station} />
            ))
          : filteredStations
              .map((station) => <Station key={station.id} station={station} />)
              .slice((page - 1) * 50, page * 50)}
      </ul>
    </div>
  )
}

export default Stationlist
