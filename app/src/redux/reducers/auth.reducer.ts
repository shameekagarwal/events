import produce from "immer";
import { Alert } from "react-native";
import { alertHeadings } from "../../constants/alert-headings.constants";
import { StoredUserType } from "../../types/stored-user.type";
import { ActionTypes } from "../action.types";
import { Action } from "../actions";

type RootState = {
  loading: boolean;
  error: string | null;
  message: string | null;
  user: StoredUserType | null;
  intialLoading: boolean;
};

const INITIAL_STATE: RootState = {
  loading: false,
  error: null,
  message: null,
  user: null,
  intialLoading: true,
};

export const authReducer = produce(
  (state: RootState = INITIAL_STATE, action: Action) => {
    switch (action.type) {
      case ActionTypes.LOGIN_ACTION_START:
      case ActionTypes.SIGNUP_ACTION_START:
      case ActionTypes.LOGOUT_ACTION_START:
        state.loading = true;
        state.error = null;
        state.user = null;
        state.message = null;
        return;
      case ActionTypes.LOGIN_ACTION_ERROR:
      case ActionTypes.SIGNUP_ACTION_ERROR:
      case ActionTypes.LOGOUT_ACTION_ERROR:
        Alert.alert(alertHeadings.ERROR, action.payload);
        state.loading = false;
        state.error = action.payload;
        return;
      case ActionTypes.LOGIN_ACTION_COMPLETE:
        state.loading = false;
        state.user = action.payload;
        return;
      case ActionTypes.SIGNUP_ACTION_COMPLETE:
        Alert.alert(alertHeadings.SUCCESS, action.payload);
        state.loading = false;
        state.user = null;
        state.message = action.payload;
        return;
      case ActionTypes.LOGOUT_ACTION_COMPLETE:
        state.loading = false;
        state.user = null;
        state.message = action.payload;
        return;
      case ActionTypes.SET_USER_ACTION:
        state.intialLoading = false;
        state.user = action.payload;
        return;
    }
  },
  INITIAL_STATE
);
