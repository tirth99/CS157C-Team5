const Base = "http://localhost:3000/";
const LOGIN_URL = Base + "api/security/login";
const USER_SIGNUP_URL = Base + "api/security/register/register-user";
const ADMIN_SIGNUP_URL = Base + "api/security/register/register-admin";
const SET_CURRENT_USER_URL = Base + "api/actions/updateCurrentUser";
const ADD_NEW_CAMP_URL = Base + "api/actions/addCamp";
const GET_CURRENT_USER_URL = Base + "api/actions/getCurrentUser/";
const GET_ALL_CAMPS_URL = Base + "api/actions/getAllCamps";
const GET_CAMP_BY_ID_URL = Base + "api/actions/getCampById/";
const UPDATE_CAMP_BY_ID_URL = Base + "api/actions/updateCampById/";
const DELETE_CAMP_BY_ID_URL = Base + "api/actions/deleteCampById/";
const FETCH_CAMPSITES_BY_QUERY = Base + "api/actions/fetchCampSitesByQuery/search?q=";
const RESERVE_CAMP_URL = Base + "api/actions/reserveCamp";
const GET_BOOKED_CAMPS_URL = Base + "api/actions/getAllBookedCamps";
const SEND_EMAIL_URL = Base + "api/actions/sendEmail"
const CHANGE_PASSWORD_URL = Base + "api/actions/changePassword"
const FETCH_ALL_USERS_URL = Base + "api/actions/fetchAllUsers"
const DELETE_USER_BY_ID_URL = Base + "api/actions/deleteUserById/"
export default {
  Base,
  LOGIN_URL,
  USER_SIGNUP_URL,
  ADMIN_SIGNUP_URL,
  SET_CURRENT_USER_URL,
  ADD_NEW_CAMP_URL,
  GET_CURRENT_USER_URL,
  GET_ALL_CAMPS_URL,
  GET_CAMP_BY_ID_URL,
  UPDATE_CAMP_BY_ID_URL,
  DELETE_CAMP_BY_ID_URL,
  RESERVE_CAMP_URL,
  GET_BOOKED_CAMPS_URL,
  FETCH_CAMPSITES_BY_QUERY,
  SEND_EMAIL_URL,
  CHANGE_PASSWORD_URL,
  FETCH_ALL_USERS_URL,
  DELETE_USER_BY_ID_URL
};
