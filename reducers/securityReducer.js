import types from '../util/ActionTypes'

const { SET_CURRENT_USER } = types

const initialState = {
    validToken: false,
    user: {}
}

const checkToken = (payload) => {
    if (payload) {
        console.log("true")
        return true;
    } else {
        console.log("false")
        return false;
    }
}

const securityReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: checkToken(action.payload),
                user: action.payload
            }

        default:
            return state
    }
}

export default securityReducer;