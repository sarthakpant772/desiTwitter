import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  status: 'idle',
  verified: false,
  data: {
    username: '',
    fname: '',
    lname: '',
    imageURL: '',
  },
}

export const verifyLogin = createAsyncThunk('user/login', async () => {
  const id = localStorage.getItem('JWT')

  const res = await axios.get(`${process.env.URL}/user/getUser`, {
    headers: {
      'x-auth-token': id,
    },
  })
  console.log(res.data)
  return res.data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyLogin.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(verifyLogin.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.verified = true
      state.data = action.payload
    })
    builder.addCase(verifyLogin.rejected, (state, action) => {
      state.status = 'failed'
    })
  },
})

// Action creators are generated for each case reducer function
export const { addUserData } = userSlice.actions

export default userSlice.reducer
