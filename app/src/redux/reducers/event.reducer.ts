import produce from "immer";
import { EventType } from "../../types/event.type";
import { ActionTypes } from "../action.types";
import { Action } from "../actions";

type RootState = {
  loading: boolean;
  error: string | null;
  message: string | null;
  events: EventType[];
};

// use same loading across
// assuming no interleaving of action creators
// at a time, only one action creator allowed to mutate state
const INITIAL_STATE: RootState = {
  loading: false,
  error: null,
  message: null,
  events: [],
};

export const eventReducer = produce(
  (state: RootState = INITIAL_STATE, action: Action) => {
    switch (action.type) {
      case ActionTypes.FETCH_EVENTS_ACTION_START:
        state.loading = true;
        state.error = null;
        state.message = null;
        state.events = [];
        return;
      case ActionTypes.FETCH_EVENTS_ACTION_COMPLETE:
        state.loading = false;
        state.events = action.payload;
        return;
      case ActionTypes.FETCH_EVENTS_ACTION_ERROR:
        state.loading = false;
        state.error = action.payload;
        return;
    }
  },
  INITIAL_STATE
);
