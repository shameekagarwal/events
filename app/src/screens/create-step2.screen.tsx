import React from "react";
import { StyleSheet } from "react-native";
import MapView, { MapEvent, Marker } from "react-native-maps";
import { CreateStepContainerComponent } from "../components/create-step-container.component";
import { useCreateEventHook } from "../hooks/use-create-event.hook";

export const CreateStep2Screen = () => {
  const context = useCreateEventHook();

  const onMapPress = (event: MapEvent<{}>) =>
    context.setCoordinates(event.nativeEvent.coordinate);

  return (
    <CreateStepContainerComponent header="Set The Marker">
      <MapView onPress={onMapPress} style={styles.map}>
        <Marker
          draggable={true}
          coordinate={context.coordinates}
          title="Your Marker"
        />
      </MapView>
    </CreateStepContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
