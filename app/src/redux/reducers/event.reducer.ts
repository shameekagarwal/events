import produce from "immer";
import { Alert } from "react-native";
import { alertHeadings } from "../../constants/alert-headings.constants";
import { EventType } from "../../types/event.type";
import { ActionTypes } from "../action.types";
import { Action } from "../actions";

type RootState = {
  loading: boolean;
  error: string | null;
  message: string | null;
  events: { [id: number]: EventType };
};

// use same loading across
// assuming no interleaving of action creators
// at a time, only one action creator allowed to mutate state
const INITIAL_STATE: RootState = {
  loading: false,
  error: null,
  message: null,
  events: {},
};

export const eventReducer = produce(
  (state: RootState = INITIAL_STATE, action: Action) => {
    switch (action.type) {
      case ActionTypes.FETCH_EVENTS_ACTION_START:
      case ActionTypes.DELETE_EVENT_ACTION_START:
      case ActionTypes.TOGGLE_EVENT_ATTEND_ACTION_START:
        state.loading = true;
        state.error = null;
        state.message = null;
        return;
      case ActionTypes.FETCH_EVENTS_ACTION_COMPLETE:
        state.loading = false;
        state.events = normalizeEvents(action.payload);
        return;
      case ActionTypes.FETCH_EVENTS_ACTION_ERROR:
      case ActionTypes.DELETE_EVENT_ACTION_ERROR:
      case ActionTypes.TOGGLE_EVENT_ATTEND_ACTION_ERROR:
        state.loading = false;
        state.error = action.payload;
        return;
      case ActionTypes.DELETE_EVENT_ACTION_COMPLETE:
        Alert.alert(alertHeadings.SUCCESS, "event deleted successfully!");
        state.loading = false;
        state.events = normalizeEvents(action.payload);
        return;
      case ActionTypes.TOGGLE_EVENT_ATTEND_ACTION_COMPLETE:
        const event = state.events[action.payload.eventId];
        if (action.payload.attending === false) {
          Alert.alert(
            alertHeadings.SUCCESS,
            "you have successfully backed off from the event!"
          );
          event.attendees = event.attendees.filter(
            (email) => email !== action.payload.email
          );
        } else {
          Alert.alert(
            alertHeadings.SUCCESS,
            "you are now attending the event!"
          );
          event.attendees.push(action.payload.email);
        }
        state.loading = false;
        return;
    }
  },
  INITIAL_STATE
);

const normalizeEvents = (events: EventType[]): RootState["events"] =>
  events.reduce((prevObj, event) => ({ ...prevObj, [event.id]: event }), {});
