import  {configureStore} from '@reduxjs/toolkit' 
import userReducer from './user/userSlice.js'
import adminReducer from './admin/adminSlice.js'
import { combineReducers } from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfigUser = {
    key:"user",
    version:1,
    storage

}

const persistConfigAdmin = {
    key:"admin",
    version:1,
    storage

}
const persistedUserReducer = persistReducer(persistConfigUser,userReducer)
const persistedAdminReducer = persistReducer(persistConfigAdmin,adminReducer)

const rootReducer = combineReducers({
    user:persistedUserReducer,
    admin:persistedAdminReducer
})

export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})

export const persistor = persistStore(store)