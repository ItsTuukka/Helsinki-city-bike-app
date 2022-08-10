import { configureStore } from '@reduxjs/toolkit'
import stationReducer from './reducers/stationReducer'
import stationFilterReducer from './reducers/stationFilterReducer'
import journeyFilterReducer from './reducers/journeyFilterReducer'

const store = configureStore({
  reducer: {
    stations: stationReducer,
    stationFilter: stationFilterReducer,
    journeyFilter: journeyFilterReducer,
  },
})

export default store
