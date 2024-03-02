import {
  createAsyncThunk,
  createSlice,
  isAsyncThunkAction,
} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  tweets: [],
  comments: [],
}
export const getComments = createAsyncThunk(
  'tweetsAction/getComments',
  async ({ id }) => {
    try {
      const res = await axios.get(`${process.env.URLS}/post/allComment/${id}`)
      return res.data
    } catch (err) {
      console.log(err)
    }
  },
)

export const postComment = createAsyncThunk(
  'tweetsAction/postComment',
  async ({ comment, id }) => {
    try {
      const userId = localStorage.getItem('JWT')
      const res = await axios.post(
        `${process.env.URLS}/post/comment/${id}`,
        {
          commentText: comment,
        },
        {
          headers: {
            'x-auth-token': userId,
          },
        },
      )
      console.log(res)
      //   return res.data
    } catch (err) {
      console.log(err)
    }
  },
)

const tweetsActionSlice = createSlice({
  name: 'tweetsAction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.comments = action.payload
    })
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload
    })
  },
})

export const {} = tweetsActionSlice.actions

export default tweetsActionSlice.reducer
