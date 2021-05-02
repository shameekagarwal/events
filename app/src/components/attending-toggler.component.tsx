import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { theme } from "../theme/index.theme";

export const AttendingTogglerComponent: React.FC = () => {
  // TODO:
  // use selector to determine if the person is attending
  // by .find(email of user)
  // set the onPress actionCreator accordingly
  const attending = false;
  const mode = attending ? "outlined" : "contained";
  const text = attending ? "back off" : "attend";

  return (
    <Button style={styles.button} mode={mode}>
      {text}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: theme.sizes[16],
    marginVertical: theme.sizes[5],
  },
});
