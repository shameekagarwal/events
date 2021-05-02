import { Dispatch } from "react";
import { errorHandlerUtil } from "../../utils/error-handler.utils";
import { getAxiosClientUtil } from "../../utils/get-axios-client.util";
import { ActionTypes } from "../action.types";
import { Action } from "../actions";

export const fetchEventsActionCreator = () => async (
  dispatch: Dispatch<Action>
) => {
  try {
    dispatch({
      type: ActionTypes.FETCH_EVENTS_ACTION_START,
    });
    const axiosClient = await getAxiosClientUtil();
    const response = await axiosClient.get("/api/query/events/");
    dispatch({
      type: ActionTypes.FETCH_EVENTS_ACTION_COMPLETE,
      payload: response.data.events,
    });
  } catch (error) {
    const errorMessage = errorHandlerUtil(error);
    dispatch({
      type: ActionTypes.FETCH_EVENTS_ACTION_ERROR,
      payload: errorMessage,
    });
  }
};

export const deleteEventActionCreator = (eventId: number) => async (
  dispatch: Dispatch<Action>
) => {
  try {
    dispatch({
      type: ActionTypes.DELETE_EVENT_ACTION_START,
    });
    const axiosClient = await getAxiosClientUtil();
    await axiosClient.delete(`/api/event/${eventId}`);
    const response = await axiosClient.get("/api/query/events/");
    dispatch({
      type: ActionTypes.DELETE_EVENT_ACTION_COMPLETE,
      payload: response.data.events,
    });
  } catch (error) {
    const errorMessage = errorHandlerUtil(error);
    dispatch({
      type: ActionTypes.DELETE_EVENT_ACTION_ERROR,
      payload: errorMessage,
    });
  }
};

export const toggleAttendActionCreator = (
  eventId: number,
  emailId: string
) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({
      type: ActionTypes.TOGGLE_EVENT_ATTEND_ACTION_START,
    });
    const axiosClient = await getAxiosClientUtil();
    const response = await axiosClient.post(`/api/attend/${eventId}`);
    dispatch({
      type: ActionTypes.TOGGLE_EVENT_ATTEND_ACTION_COMPLETE,
      payload: {
        email: emailId,
        attending: response.data.attending,
        eventId,
      },
    });
  } catch (error) {
    const errorMessage = errorHandlerUtil(error);
    dispatch({
      type: ActionTypes.TOGGLE_EVENT_ATTEND_ACTION_ERROR,
      payload: errorMessage,
    });
  }
};
