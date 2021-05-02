import axios from "axios";
import { BACKEND_BASE_URL } from "../constants/backend-base-url.constants";
import { getUserCredentialsUtil } from "./user-credentials.util";

export const getAxiosClientUtil = async () => {
  const userCredentials = await getUserCredentialsUtil();
  if (userCredentials.token) {
    return axios.create({
      baseURL: BACKEND_BASE_URL,
      headers: {
        authorization: `Bearer ${userCredentials.token}`,
      },
    });
  } else {
    return axios.create({
      baseURL: BACKEND_BASE_URL,
    });
  }
};
