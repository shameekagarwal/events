import {
  LoginActionComplete,
  LoginActionError,
  LoginActionStart,
  LogoutActionComplete,
  LogoutActionError,
  LogoutActionStart,
  SetUserAction,
  SignupActionComplete,
  SignupActionError,
  SignupActionStart,
} from "./auth.actions";

import {
  DeleteEventActionComplete,
  DeleteEventActionError,
  DeleteEventActionStart,
  FetchEventsActionComplete,
  FetchEventsActionError,
  FetchEventsActionStart,
  ToggleEventAttendActionComplete,
  ToggleEventAttendActionError,
  ToggleEventAttendActionStart,
} from "./event.actions";

export type Action =
  | LoginActionStart
  | SignupActionStart
  | LogoutActionStart
  | LoginActionComplete
  | SignupActionComplete
  | LogoutActionComplete
  | LoginActionError
  | SignupActionError
  | LogoutActionError
  | SetUserAction
  | FetchEventsActionStart
  | FetchEventsActionComplete
  | FetchEventsActionError
  | DeleteEventActionStart
  | DeleteEventActionComplete
  | DeleteEventActionError
  | ToggleEventAttendActionStart
  | ToggleEventAttendActionComplete
  | ToggleEventAttendActionError;
