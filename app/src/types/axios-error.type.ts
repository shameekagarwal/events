export type AxiosErrorType = {
  response: {
    data: {
      errors: string[];
    };
  };
  message: string;
};
