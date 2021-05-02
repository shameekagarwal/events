import { AxiosErrorType } from "../types/axios-error.type";

export const errorHandlerUtil = (error: AxiosErrorType) => {
  const errorMessages = error.response?.data?.errors;
  if (errorMessages) {
    return errorMessages[0];
  } else {
    return error.message;
  }
};
