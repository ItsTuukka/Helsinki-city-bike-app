import { configureStore } from '@reduxjs/toolkit'
import stationReducer from './reducers/stationReducer'
import stationFilterReducer from './reducers/stationFilterReducer'

const store = configureStore({
  reducer: {
    stations: stationReducer,
    filter: stationFilterReducer,
  },
})

export default store
