import { createSlice } from '@reduxjs/toolkit'

const journeyFilterSlice = createSlice({
  name: 'stationJourneyFilter',
  initialState: '',
  reducers: {
    setJourneyFilter(state, action) {
      return action.payload
    },
  },
})

export const { setJourneyFilter } = journeyFilterSlice.actions
export default journeyFilterSlice.reducer
