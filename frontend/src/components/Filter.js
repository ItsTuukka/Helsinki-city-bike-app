import React from 'react'
import { useDispatch } from 'react-redux'
import { setStationFilter } from '../reducers/stationFilterReducer'

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
    <div style={style}>
      search by name <input onChange={handleChange} />
    </div>
  )
}

export default Filter
