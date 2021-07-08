import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

const middlware = [thunk]

const initialState = {}

let store;

store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlware)))

export default store;