import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setJourneys } from '../reducers/journeyReducer'

const JourneyDetails = ({ journeys, columns }) => {
  return (
    <tbody>
      {journeys.map((journey) => {
        return (
          <tr key={journey.id}>
            {columns.map(({ accessor }) => {
              if (accessor === 'distance') {
                return (
                  <td key={accessor}>
                    {(journey[accessor] / 1000).toFixed(2)}
                  </td>
                )
              }
              if (accessor === 'duration') {
                return (
                  <td key={accessor}>{(journey[accessor] / 60).toFixed(2)}</td>
                )
              }
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
  const dispatch = useDispatch()
  const journeys = useSelector(({ journeys }) => journeys)
  const columns = [
    { label: 'Departure Station', accessor: 'departureStationName' },
    { label: 'Return Station', accessor: 'returnStationName' },
    { label: 'Distance (km)', accessor: 'distance' },
    { label: 'Duration (min)', accessor: 'duration' },
  ]
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
      dispatch(setJourneys(sorted))
    }
    if (sortField === 'distance' || sortField === 'duration') {
      const sorted = [...journeys].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortField] - b[sortField]
        } else {
          return b[sortField] - a[sortField]
        }
      })
      dispatch(setJourneys(sorted))
    }
  }

  return (
    <table className="table">
      <caption>Journey data, column headers are sortable.</caption>
      <TableHeader {...{ columns, handleSorting }} />
      <JourneyDetails {...{ journeys, columns }} />
    </table>
  )
}

export default JourneyTable
