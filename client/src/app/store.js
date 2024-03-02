import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../feature/user'
import alertReducer from '../feature/alert'
import tweetsActionReducer from '../feature/tweetsAction'
export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
    tweetsAction: tweetsActionReducer,
  },
})
