import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import timeOffReducer from "./time-off-reducer";
import userReducer from './UserReducer'
import commonReducer from "./common-reducer";
import bookReducer from "./book-reducer";

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: [
        'userReducer',
        'commonReducer',
        'timeOffReducer',
        'bookReducer'
    ]
}

const rootReducer = combineReducers({
    userReducer,
    commonReducer,
    timeOffReducer,
    bookReducer
})

export default persistReducer(persistConfig, rootReducer)
