import { createSlice } from '@reduxjs/toolkit'

const stationFilterSlice = createSlice({
  name: 'stationFilter',
  initialState: '',
  reducers: {
    setStationFilter(state, action) {
      return action.payload
    },
  },
})

export const { setStationFilter } = stationFilterSlice.actions
export default stationFilterSlice.reducer
