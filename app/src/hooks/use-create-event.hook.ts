import { useContext } from "react";
import { CreateEventContext } from "../context/create-event.context";

export const useCreateEventHook = () => {
  const context = useContext(CreateEventContext);
  if (typeof context === "undefined") {
    throw new Error("accessing event context oustide provider");
  }
  return context;
};
