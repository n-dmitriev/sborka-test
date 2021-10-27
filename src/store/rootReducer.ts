import {combineReducers, configureStore} from '@reduxjs/toolkit'
import spStore from './spStore/spStoreReducer'

const rootReducer = combineReducers({
    spStore
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer
})

export type RootStore = ReturnType<typeof store.getState>
