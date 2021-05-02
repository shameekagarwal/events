import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../redux/action-creators";

export const useActionsHook = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(actionCreators, dispatch), [
    dispatch,
  ]);
};
