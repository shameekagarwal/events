import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { CreateStepContainerComponent } from "../components/create-step-container.component";
import { useCreateEventHook } from "../hooks/use-create-event.hook";
import { theme } from "../theme/index.theme";

export const CreateStep3Screen = () => {
  const context = useCreateEventHook();
  const navigation = useNavigation();
  const createEvent = async () => {
    const success = await context.createEvent();
    if (success) {
      navigation.navigate("Events");
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Oh Snap!",
        "sorry, you need to upload an image to be able to create an event"
      );
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      context.setImage(result.uri);
    }
  };

  return (
    <CreateStepContainerComponent header="Add An Image">
      <Button onPress={pickImage} style={styles.button} mode="contained">
        pick an image
      </Button>
      <View style={styles.imageContainer}>
        {context.image ? (
          <Image style={styles.image} source={{ uri: context.image }} />
        ) : null}
      </View>
      <Button
        disabled={context.loading}
        onPress={createEvent}
        style={styles.buttonAction}
        mode="contained"
      >
        {"create  event"}
      </Button>
    </CreateStepContainerComponent>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: theme.sizes[4],
    width: theme.sizes[16],
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: theme.sizes[17],
    marginBottom: theme.sizes[4],
  },
  buttonAction: {
    backgroundColor: theme.colors.action,
    marginTop: theme.sizes[15],
    width: theme.sizes[18],
    alignSelf: "center",
  },
});
