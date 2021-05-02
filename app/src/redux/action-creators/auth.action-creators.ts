import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";
import { AuthCredentialsType } from "../../types/auth-credentials.type";
import { errorHandlerUtil } from "../../utils/error-handler.utils";
import { getAxiosClientUtil } from "../../utils/get-axios-client.util";
import {
  removeUserCredentialsUtil,
  setUserCredentialsUtil,
} from "../../utils/user-credentials.util";
import { ActionTypes } from "../action.types";
import { Action } from "../actions";

export const loginActionCreator = (data: AuthCredentialsType) => async (
  dispatch: Dispatch<Action>
) => {
  try {
    dispatch({
      type: ActionTypes.LOGIN_ACTION_START,
    });
    const axiosClient = await getAxiosClientUtil();
    const response = await axiosClient.post("/api/auth/signin", {
      email: data.email,
      password: data.password,
    });
    await setUserCredentialsUtil(response.data.payload);
    dispatch({
      type: ActionTypes.LOGIN_ACTION_COMPLETE,
      payload: response.data.payload,
    });
  } catch (error) {
    const errorMessage = errorHandlerUtil(error);
    dispatch({
      type: ActionTypes.LOGIN_ACTION_ERROR,
      payload: errorMessage,
    });
  }
};

export const signupActionCreator = (data: AuthCredentialsType) => async (
  dispatch: Dispatch<Action>
) => {
  try {
    dispatch({
      type: ActionTypes.SIGNUP_ACTION_START,
    });
    const axiosClient = await getAxiosClientUtil();
    const response = await axiosClient.post("/api/auth/signup", {
      email: data.email,
      password: data.password,
    });
    dispatch({
      type: ActionTypes.SIGNUP_ACTION_COMPLETE,
      payload: response.data.message,
    });
  } catch (error) {
    const errorMessage = errorHandlerUtil(error);
    dispatch({
      type: ActionTypes.SIGNUP_ACTION_ERROR,
      payload: errorMessage,
    });
  }
};

export const logoutActionCreator = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({
      type: ActionTypes.LOGOUT_ACTION_START,
    });
    await removeUserCredentialsUtil();
    dispatch({
      type: ActionTypes.LOGOUT_ACTION_COMPLETE,
      payload: "logged out successfully",
    });
  } catch (error) {
    const errorMessage = errorHandlerUtil(error);
    dispatch({
      type: ActionTypes.LOGOUT_ACTION_ERROR,
      payload: errorMessage,
    });
  }
};

export const verifyUserActionCreator = () => async (
  dispatch: Dispatch<Action>
) => {
  const axiosClient = await getAxiosClientUtil();
  const response = await axiosClient.get("/api/auth/currentuser");
  // if token hasnt expired, currentUser wil be defined
  if (!response.data.currentUser) {
    await AsyncStorage.removeItem("auth");
    dispatch({
      type: ActionTypes.SET_USER_ACTION,
      payload: null,
    });
  } else {
    const storedUser = JSON.parse((await AsyncStorage.getItem("auth")) || "");
    console.log("current user - ", JSON.stringify(storedUser, null, 2));
    dispatch({
      type: ActionTypes.SET_USER_ACTION,
      payload: storedUser,
    });
  }
};
