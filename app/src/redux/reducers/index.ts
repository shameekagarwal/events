import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { eventReducer } from "./event.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
