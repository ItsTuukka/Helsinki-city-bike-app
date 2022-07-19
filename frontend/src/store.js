import { configureStore } from '@reduxjs/toolkit'
import journeyReducer from './reducers/journeyReducer'
import stationReducer from './reducers/stationReducer'
import stationFilterReducer from './reducers/stationFilterReducer'

const store = configureStore({
  reducer: {
    journeys: journeyReducer,
    stations: stationReducer,
    filter: stationFilterReducer,
  },
})

export default store
