import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "../theme/index.theme";

export const LoaderComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={true}
        color={theme.colors.primary}
        size={theme.sizes[15]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
