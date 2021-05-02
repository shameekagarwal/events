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
  FetchEventsActionStart,
  FetchEventsActionComplete,
  FetchEventsActionError,
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
  | FetchEventsActionError;
