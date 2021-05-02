import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import { useActionsHook } from "../hooks/use-actions.hook";
import { useSelectorHook } from "../hooks/use-selector.hook";
import { theme } from "../theme/index.theme";
import { EventType } from "../types/event.type";

export const UserCreatedEventsComponent = () => {
  const navigator = useNavigation();

  const events = useSelectorHook((state) =>
    Object.values(state.event.events).filter(
      (event) => event.organizerEmail === state.auth.user!.email
    )
  );
  const { deleteEventActionCreator } = useActionsHook();

  const navigateToEvent = (eventId: number) =>
    navigator.navigate("EventsDetail", { eventId });

  const deleteEvent = (event: EventType) => {
    Alert.alert(
      "Confirmation",
      `Are You Sure You Want To Delete The Event "${event.title}" ?`,
      [
        {
          text: "cancel",
          onPress: () => {},
        },
        {
          text: "delete",
          onPress: () => deleteEventActionCreator(event.id),
        },
      ]
    );
  };

  return (
    <List.Accordion
      title="Events You Created"
      titleStyle={styles.title}
      style={styles.container}
    >
      {events.map((event) => (
        <List.Item
          onPress={() => navigateToEvent(event.id)}
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
