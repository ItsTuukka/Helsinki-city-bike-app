import React from 'react'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'

const Journey = ({ journey }) => {
  const distance = journey.distance / 1000
  const duration = journey.duration / 60

  return (
    <tr>
      <td>{journey.departureStationName}</td>
      <td>{journey.returnStationName}</td>
      <td>{distance.toFixed(2)}</td>
      <td>{duration.toFixed(2)}</td>
    </tr>
  )
}

const Journeylist = () => {
  const journeys = useSelector(({ journeys }) => journeys)

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Departure station</th>
          <th>Return station</th>
          <th>Distance (km)</th>
          <th>Duration (min)</th>
        </tr>
      </thead>
      <tbody>
        {journeys.map((journey) => (
          <Journey key={journey.id} journey={journey} />
        ))}
      </tbody>
    </Table>
  )
}

export default Journeylist
