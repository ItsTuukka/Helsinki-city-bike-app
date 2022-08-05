import React, { useEffect, useState } from 'react'
import { Pagination } from '@mui/material'
import journeyService from '../services/journey'

const JourneyDetails = ({ journeys, columns }) => {
  return (
    <tbody>
      {journeys.map((journey) => {
        return (
          <tr key={journey.id}>
            {columns.map(({ accessor }) => {
              return <td key={accessor}>{journey[accessor]}</td>
            })}
          </tr>
        )
      })}
    </tbody>
  )
}

const TableHeader = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState('')
  const [order, setOrder] = useState('asc')

  const handleChange = (accessor) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc'
    setSortField(accessor)
    setOrder(sortOrder)
    handleSorting(accessor, sortOrder)
  }
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor }) => {
          const cl =
            sortField === accessor && order === 'asc'
              ? 'up'
              : sortField === accessor && order === 'desc'
              ? 'down'
              : 'default'
          return (
            <th
              key={accessor}
              onClick={() => handleChange(accessor)}
              className={cl}
            >
              {label}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

const JourneyTable = () => {
  const [page, setPage] = useState(1)
  const [journeys, setJourneys] = useState([])
  const columns = [
    { label: 'Departure Station', accessor: 'departureStationName' },
    { label: 'Return Station', accessor: 'returnStationName' },
    { label: 'Distance (km)', accessor: 'distance' },
    { label: 'Duration (min)', accessor: 'duration' },
  ]

  useEffect(() => {
    journeyService.getAll(page).then((journeys) => setJourneys(journeys))
  }, [page])

  const handlePageChange = (e, value) => {
    setPage(value)
  }

  const handleSorting = (sortField, sortOrder) => {
    if (
      sortField === 'departureStationName' ||
      sortField === 'returnStationName'
    ) {
      const sorted = [...journeys].sort((a, b) => {
        return (
          a[sortField].localeCompare(b[sortField]) *
          (sortOrder === 'asc' ? 1 : -1)
        )
      })
      setJourneys(sorted)
    }
    if (sortField === 'distance' || sortField === 'duration') {
      const sorted = [...journeys].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortField] - b[sortField]
        } else {
          return b[sortField] - a[sortField]
        }
      })
      setJourneys(sorted)
    }
  }

  return (
    <div>
      <br />
      <Pagination
        count={18300}
        variant="outlined"
        page={page}
        onChange={handlePageChange}
      />
      <br />
      <table className="table">
        <caption>Journey data, column headers are sortable.</caption>
        <TableHeader {...{ columns, handleSorting }} />
        <JourneyDetails {...{ journeys, columns }} />
      </table>
    </div>
  )
}

export default JourneyTable
