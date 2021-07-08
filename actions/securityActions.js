import axios from "axios";
import urls from "../util/APIConfig";
import types from "../util/ActionTypes";
import setJwt from "../util/security/setJwt";
import jwt_decode from "jwt-decode";
import Router from "next/router";
import Cookies from "universal-cookie";

const { LOGIN_URL, USER_SIGNUP_URL, ADMIN_SIGNUP_URL, SET_CURRENT_USER_URL } =
  urls;
const { GET_ERRORS, SET_CURRENT_USER } = types;

export const createUserAccount = (newUser) => (dispatch) => {
  axios
    .post(USER_SIGNUP_URL, newUser)
    .then((result) => {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      Router.push("/login");
    })
    .catch((reason) => {
      dispatch({
        type: GET_ERRORS,
        payload: reason.response.data,
      });
    });
};
export const updateCurrentUser = (updatedUser) => (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  axios
    .post(SET_CURRENT_USER_URL, updatedUser, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((result) => {
      const user = result.data;
      dispatch({
        type: SET_CURRENT_USER,
        payload: user,
      });
      Router.push("/");
    })
    .catch((reason) => {
      dispatch({
        type: GET_ERRORS,
        payload: reason.response.data,
      });
    });
};
export const createAdminAccount = (newAdmin, history) => (dispatch) => {
  axios
    .post(ADMIN_SIGNUP_URL, newAdmin)
    .then((result) => {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      Router.push("/login");
    })
    .catch((reason) => {
      dispatch({
        type: GET_ERRORS,
        payload: reason.response.data,
      });
    });
};

export const login = (loginData) => (dispatch) => {
  axios
    .post(LOGIN_URL, loginData)
    .then((result) => {
      const { token } = result.data;
      localStorage.setItem("jwtToken", token);
      setJwt(token);
      const decode = jwt_decode(token);
      document.cookie = `username=${decode.username}`;
      localStorage.setItem("user", JSON.stringify(decode));
      dispatch({
        type: SET_CURRENT_USER,
        payload: decode,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  const cookies = new Cookies();
  cookies.remove("jwt");
  setJwt(false);
  dispatch({
    type: SET_CURRENT_USER,
  });
};
