import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { ACTIONS, API, getConfig } from "../helpers/const";
import { useNavigate } from "react-router-dom";
const authContext = createContext();
export const useAuth = () => useContext(authContext);
const AuthContextProvider = ({ children }) => {
  const INIT_STATE = { users: [], oneUser: {} };
  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case ACTIONS.GET_USERS:
        return { ...state, users: action.payload };
      case ACTIONS.GET_ONE_USER:
        return { ...state, oneUser: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // ! Register
  async function handleRegister(formData, username) {
    try {
      const { data } = await axios.post(`${API}/account/register/`, formData);
      navigate("/register_active");
      localStorage.setItem("username", JSON.stringify(username));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleActiveRegister(formData) {
    try {
      const { data } = await axios.post(`${API}/account/activate/`, formData);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleResetPassword() {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      if (!tokens || !tokens.access) {
        throw new Error("No access token available");
      }
      const config = {
        headers: { Authorization: `Bearer ${tokens.access}` },
      };
      await axios.post(`${API}/account/reset_password/`, {}, config);
    } catch (error) {
      console.error(error);
    }
  }
  // !Login
  async function handleLogin(formData, email) {
    try {
      const { data } = await axios.post(`${API}/account/login/`, formData);
      window.location.reload();
      localStorage.setItem("tokens", JSON.stringify(data));
      localStorage.setItem("email", JSON.stringify(email));
      navigate("/");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  // !Logout
  const handleLogout = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      if (!tokens || !tokens.access) {
        throw new Error("No access token available");
      }
      const config = {
        headers: { Authorization: `Bearer ${tokens.access}` },
      };
      const configData = {
        refresh: tokens.refresh,
      };
      await axios.post(`${API}/account/logout/`, configData, config);
      localStorage.removeItem("tokens");
      localStorage.removeItem("email");
      localStorage.removeItem("avatar");
      localStorage.removeItem("link");
      localStorage.removeItem("bio");
      window.location.reload();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  async function getUsers() {
    try {
      let { data } = await axios(`${API}/account/users/`, getConfig());
      dispatch({ type: ACTIONS.GET_USERS, payload: data });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function getOneUser(id) {
    try {
      let { data } = await axios(`${API}/account/user/${id}/`, getConfig());
      dispatch({ type: ACTIONS.GET_ONE_USER, payload: data });
    } catch (error) {
      console.error(error);
    }
  }
  async function editUser(formData) {
    try {
      let res = await axios.put(
        `${API}/account/profile_update/`,
        formData,
        getConfig()
      );
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  async function addVerified() {
    try {
      const res = await axios.post(`${API}/account/user_vip/`, getConfig());
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
  async function getSubscribers() {
    try {
      let res = await axios(`${API}/posts/subscriptions/`, getConfig());
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
  async function toSubscribe() {
    try {
      let res = await axios.post(
        `${API}/posts//subscriptions/${id}/`,
        getConfig()
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteUser() {
    try {
      const res = await axios.delete(
        `${API}/account/delete_user/`,
        getConfig()
      );
      window.location.reload();
      navigate("/login");
      localStorage.removeItem("tokens");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      localStorage.removeItem("avatar");
      localStorage.removeItem("bio");
      localStorage.removeItem("link");
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
  const values = {
    error,
    handleRegister,
    setError,
    handleLogin,
    handleLogout,
    getUsers,
    users: state.users,
    handleActiveRegister,
    handleResetPassword,
    getOneUser,
    oneUser: state.oneUser,
    editUser,
    getSubscribers,
    toSubscribe,
    deleteUser,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
//! начальный код
