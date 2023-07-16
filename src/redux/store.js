import {configureStore} from "@reduxjs/toolkit"
import movieReducer from "./feature/movieSlice"

const store = configureStore({
    reducer : {
      movie : movieReducer
    }
})

export default store