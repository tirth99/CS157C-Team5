const Base = 'http://localhost:3001/'
const LOGIN_URL = Base + 'api/security/login'
const USER_SIGNUP_URL = Base + 'api/security/register/register-user'
const ADMIN_SIGNUP_URL = Base + 'api/security/register/register-admin'
const SET_CURRENT_USER_URL = Base + 'api/actions/updateCurrentUser'
const ADD_NEW_CAMP = Base + 'api/actions/addCamp'
const GET_CURRENT_USER = Base + 'api/actions/getCurrentUser/'
export default {
    Base,
    LOGIN_URL,
    USER_SIGNUP_URL,
    ADMIN_SIGNUP_URL,
    SET_CURRENT_USER_URL,
    ADD_NEW_CAMP,
    GET_CURRENT_USER,
}