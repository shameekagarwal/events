import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { UserAttendingEventsComponent } from "../components/user-attending-events.component";
import { UserCreatedEventsComponent } from "../components/user-created-events.component";
import { useActionsHook } from "../hooks/use-actions.hook";
import { theme } from "../theme/index.theme";

export const ProfileScreen = () => {
  const { logoutActionCreator } = useActionsHook();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserCreatedEventsComponent />
        <UserAttendingEventsComponent />
        <Button
          onPress={logoutActionCreator}
          style={styles.button}
          mode="outlined"
        >
          logout
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.sizes[4],
  },
  button: {
    width: theme.sizes[17],
    alignSelf: "center",
    marginVertical: theme.sizes[7],
  },
});
