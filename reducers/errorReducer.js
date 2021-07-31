import types from "../util/ActionTypes";

const { GET_ERRORS } = types;

const initialState = {
  errors: {},
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default errorReducer;
