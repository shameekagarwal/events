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
