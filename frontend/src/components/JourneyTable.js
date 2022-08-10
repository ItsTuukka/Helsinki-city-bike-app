import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from '@mui/material'
import journeyService from '../services/journey'
import Filter from './JourneyFilter'

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
  const filter = useSelector(({ journeyFilter }) => journeyFilter)
  const columns = [
    { label: 'Departure Station', accessor: 'departureStationName' },
    { label: 'Return Station', accessor: 'returnStationName' },
    { label: 'Distance (km)', accessor: 'distance' },
    { label: 'Duration (min)', accessor: 'duration' },
  ]

  useEffect(() => {
    journeyService.getAll(page).then((journeys) => setJourneys(journeys))
  }, [page])

  const filteredJourneys = journeys.filter(
    (journey) =>
      journey.departureStationName
        .toLowerCase()
        .includes(filter.toLowerCase()) ||
      journey.returnStationName.toLowerCase().includes(filter.toLowerCase())
  )

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
      <Filter />
      <table className="table">
        <caption>Journey data, column headers are sortable.</caption>
        <TableHeader {...{ columns, handleSorting }} />
        <JourneyDetails journeys={filteredJourneys} columns={columns} />
      </table>
    </div>
  )
}

export default JourneyTable
