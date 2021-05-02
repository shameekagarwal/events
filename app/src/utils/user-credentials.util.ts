import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoredUserType } from "../types/stored-user.type";

export const getUserCredentialsUtil = async (): Promise<StoredUserType> => {
  const raw = await AsyncStorage.getItem("auth");
  const userCredentials = JSON.parse(raw || "{}");
  return userCredentials;
};

export const setUserCredentialsUtil = async (
  userCredentials: StoredUserType
) => {
  await AsyncStorage.setItem("auth", JSON.stringify(userCredentials));
};

export const removeUserCredentialsUtil = async () => {
  await AsyncStorage.removeItem("auth");
};
