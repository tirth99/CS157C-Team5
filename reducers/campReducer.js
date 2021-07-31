import types from "../util/ActionTypes";

const { ADD_NEW_CAMP, DELETE_CAMP, UPDATE_CAMP, FINAL_UPDATE_CAMP } = types;
const initialState = {
  isAdded: 0,
  updatedCamp: {},
  defaultFileList: [],
  isUpdated: 0,
  isDeleted: 0,
};

const campReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_CAMP:
      return {
        ...state,
        isAdded: action.payload.isAdded,
      };
    case UPDATE_CAMP:
      return {
        ...state,
        updatedCamp: action.payload.updatedCamp,
        defaultFileList: action.payload.defaultFileList,
      };
    case FINAL_UPDATE_CAMP:
      return {
        ...state,
        isUpdated: action.payload.isUpdated,
      };
    case DELETE_CAMP:
      return {
        ...state,
        isDeleted: action.payload.isDeleted,
      };
    default:
      return state;
  }
};

export default campReducer;
