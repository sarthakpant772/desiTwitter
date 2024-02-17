import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  status: '',
  message: false,
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    makeAlert: (state, action) => {
      state.status = action.payload.status
      state.message = action.payload.message
    },
    makeAlertClear: (state) => {
      state.status = ''
      state.message = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { makeAlert, makeAlertClear } = alertSlice.actions

export default alertSlice.reducer
