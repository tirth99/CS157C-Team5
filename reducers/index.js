import { combineReducers } from 'redux'
import securityReducer from './securityReducer'
import errorReducer from './errorReducer'
import campReducer from './campReducer'

export default combineReducers({
    error : errorReducer,
    security: securityReducer,
    camp: campReducer,
})