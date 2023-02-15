import { createSlice } from '@reduxjs/toolkit';


const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: [],
  reducers: {
    toggleFavourite(state, payload) {
      const findState = state.includes(payload.payload)
      if (!findState) {
        state.push(payload.payload)
      } else if (findState) {
        const indexOfState = state.indexOf(payload.payload)
        state = state.splice(indexOfState, 1)
      }
    },
  }
})

export const { toggleFavourite } = favouritesSlice.actions

export default favouritesSlice.reducer
