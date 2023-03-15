import {configureStore} from "@reduxjs/toolkit"
import counterReducer from './slices/counterSlices'
import activeReducer from './slices/activeSlices'
import blobReducer from "./slices/blobSlices"

export const store = configureStore({
    reducer: {counter: counterReducer, active: activeReducer, blob: blobReducer},
    // reducer: {active: activeReducer},
})