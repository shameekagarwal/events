import { EventType } from "../../types/event.type";
import { ActionTypes } from "../action.types";

export interface FetchEventsActionStart {
  type: ActionTypes.FETCH_EVENTS_ACTION_START;
}

export interface FetchEventsActionComplete {
  type: ActionTypes.FETCH_EVENTS_ACTION_COMPLETE;
  payload: EventType[];
}

export interface FetchEventsActionError {
  type: ActionTypes.FETCH_EVENTS_ACTION_ERROR;
  payload: string;
}

export interface DeleteEventActionStart {
  type: ActionTypes.DELETE_EVENT_ACTION_START;
}

export interface DeleteEventActionComplete {
  type: ActionTypes.DELETE_EVENT_ACTION_COMPLETE;
  payload: EventType[];
}

export interface DeleteEventActionError {
  type: ActionTypes.DELETE_EVENT_ACTION_ERROR;
  payload: string;
}

export interface ToggleEventAttendActionStart {
  type: ActionTypes.TOGGLE_EVENT_ATTEND_ACTION_START;
}

export interface ToggleEventAttendActionComplete {
  type: ActionTypes.TOGGLE_EVENT_ATTEND_ACTION_COMPLETE;
  payload: {
    email: string;
    attending: boolean;
    eventId: number;
  };
}

export interface ToggleEventAttendActionError {
  type: ActionTypes.TOGGLE_EVENT_ATTEND_ACTION_ERROR;
  payload: string;
}
