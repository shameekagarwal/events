import React from "react";
import { StyleSheet } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import { theme } from "../theme/index.theme";

type OtherProps = {
  coordinates: LatLng;
};
type Props = OtherProps;

export const MapComponent: React.FC<Props> = (props) => {
  return (
    <MapView style={styles.map}>
      <Marker coordinate={props.coordinates} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: theme.sizes[17],
    marginTop: theme.sizes[4],
  },
});
