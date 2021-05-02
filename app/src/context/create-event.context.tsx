import FormData from "form-data";
import mime from "mime";
import React, { createContext, useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { LatLng } from "react-native-maps";
import { alertHeadings } from "../constants/alert-headings.constants";
import { useSelectorHook } from "../hooks/use-selector.hook";
import { errorHandlerUtil } from "../utils/error-handler.utils";
import { getAxiosClientUtil } from "../utils/get-axios-client.util";
import { getIsoDateUtil } from "../utils/get-iso-date.util";

const Context = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<string>(getIsoDateUtil());
  const [coordinates, setCoordinates] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  const [image, setImage] = useState<string>("");
  const { user } = useSelectorHook((state) => state.auth);

  console.log({ coordinates });

  // TODO:
  // should dispatch an action getEvents
  // refetch all events - con of microservices?
  const createEvent = useCallback(async () => {
    setLoading(true);
    try {
      const axiosClient = await getAxiosClientUtil();
      const imageUri = "file:///" + image.split("file:/").join("");

      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        name: imageUri.split("/").pop(),
        type: mime.getType(imageUri),
      });
      formData.append("date", date);
      formData.append("description", description);
      formData.append("latitude", coordinates.latitude.toString());
      formData.append("longitude", coordinates.longitude.toString());
      formData.append("title", title);
      formData.append("organizerId", user!.id);
      formData.append("email", user!.email);

      await axiosClient.post("/api/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setError(null);
      Alert.alert(alertHeadings.SUCCESS, "event created successfully!");
      setTitle("");
      setDescription("");
      setDate(getIsoDateUtil());
      setCoordinates({ latitude: 0, longitude: 0 });
      setImage("");
      setLoading(false);
      return true;
    } catch (e) {
      const errorMessage = errorHandlerUtil(e);
      Alert.alert(alertHeadings.SUCCESS, errorMessage);
      setError(errorMessage);
      setLoading(false);
      return false;
    }
  }, [coordinates, date, description, image, title, user]);

  const value = useMemo(
    () => ({
      coordinates,
      createEvent,
      date,
      description,
      error,
      image,
      loading,
      title,
      setCoordinates,
      setDate,
      setDescription,
      setImage,
      setTitle,
    }),
    [
      coordinates,
      createEvent,
      date,
      description,
      error,
      image,
      loading,
      title,
      setCoordinates,
      setDate,
      setDescription,
      setImage,
      setTitle,
    ]
  );

  return value;
};

type ContextType = ReturnType<typeof Context>;

export const CreateEventContext = createContext<ContextType | undefined>(
  undefined
);

export const CreateEventProvider: React.FC = ({ children }) => {
  const value = Context();
  return (
    <CreateEventContext.Provider value={value}>
      {children}
    </CreateEventContext.Provider>
  );
};
