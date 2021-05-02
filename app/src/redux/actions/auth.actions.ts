import { StoredUserType } from "../../types/stored-user.type";
import { ActionTypes } from "../action.types";

export interface LoginActionStart {
  type: ActionTypes.LOGIN_ACTION_START;
}

export interface SignupActionStart {
  type: ActionTypes.SIGNUP_ACTION_START;
}

export interface LogoutActionStart {
  type: ActionTypes.LOGOUT_ACTION_START;
}

export interface LoginActionComplete {
  type: ActionTypes.LOGIN_ACTION_COMPLETE;
  payload: StoredUserType;
}

export interface SignupActionComplete {
  type: ActionTypes.SIGNUP_ACTION_COMPLETE;
  payload: string;
}

export interface LogoutActionComplete {
  type: ActionTypes.LOGOUT_ACTION_COMPLETE;
  payload: string;
}

export interface LoginActionError {
  type: ActionTypes.LOGIN_ACTION_ERROR;
  payload: string;
}

export interface SignupActionError {
  type: ActionTypes.SIGNUP_ACTION_ERROR;
  payload: string;
}

export interface LogoutActionError {
  type: ActionTypes.LOGOUT_ACTION_ERROR;
  payload: string;
}

export interface SetUserAction {
  type: ActionTypes.SET_USER_ACTION;
  payload: StoredUserType | null;
}
