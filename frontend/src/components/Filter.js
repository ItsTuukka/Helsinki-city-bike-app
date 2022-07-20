import React from 'react'
import { useDispatch } from 'react-redux'
import { setStationFilter } from '../reducers/stationFilterReducer'
import Form from 'react-bootstrap/Form'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    e.preventDefault()
    const filter = e.target.value
    dispatch(setStationFilter(filter))
  }
  const style = {
    marginBottom: 10,
    marginTop: 10,
  }

  return (
    <Form style={style}>
      <Form.Label>Search station by name</Form.Label>
      <Form.Control
        type="text"
        placeholder="e.g. Hanasaari"
        onChange={handleChange}
      />
    </Form>
  )
}

export default Filter
