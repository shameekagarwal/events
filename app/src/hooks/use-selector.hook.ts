import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../redux/reducers";

export const useSelectorHook: TypedUseSelectorHook<RootState> = useSelector;
