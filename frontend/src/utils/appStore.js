import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionSlice from "./connectionSlice"

const userStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections:connectionSlice,
  },
})

export default userStore;