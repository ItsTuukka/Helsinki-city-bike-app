import React from 'react'
import { useDispatch } from 'react-redux'
import { setJourneyFilter } from '../reducers/journeyFilterReducer'
import Form from 'react-bootstrap/Form'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    e.preventDefault()
    const filter = e.target.value
    dispatch(setJourneyFilter(filter))
  }
  const style = {
    marginBottom: 10,
    marginTop: 10,
  }

  return (
    <Form style={style} id="journeyFilter">
      <Form.Label>Search journey by departure or return station</Form.Label>
      <Form.Control
        type="text"
        placeholder="searches from data on this page"
        onChange={handleChange}
      />
    </Form>
  )
}

export default Filter
