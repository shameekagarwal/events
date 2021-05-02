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
