import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import { theme } from "../theme/index.theme";
import { EventType } from "../types/event.type";

export const UserCreatedEventsComponent = () => {
  const deleteEvent = (event: EventType) => {
    Alert.alert(
      "Confirmation",
      `Are You Sure You Want To Delete The Event "${event.title}" ?`
    );
  };

  return (
    <List.Accordion
      title="Events You Created"
      titleStyle={styles.title}
      style={styles.container}
    >
      {([] as EventType[]).map((event) => (
        <List.Item
          title={event.title}
          key={event.id}
          right={(props) => (
            <TouchableOpacity onPress={() => deleteEvent(event)}>
              <List.Icon {...props} color={theme.colors.action} icon="delete" />
            </TouchableOpacity>
          )}
        />
      ))}
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: theme.sizes[4] + theme.sizes[3],
  },
  container: {
    marginTop: theme.sizes[5],
  },
});
