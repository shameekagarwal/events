import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { useSelectorHook } from "../hooks/use-selector.hook";
import { theme } from "../theme/index.theme";

export const UserAttendingEventsComponent = () => {
  const navigator = useNavigation();

  const events = useSelectorHook((state) =>
    Object.values(state.event.events).filter((event) =>
      event.attendees.includes(state.auth.user!.email)
    )
  );

  const navigateToEvent = (eventId: number) =>
    navigator.navigate("EventsDetail", { eventId });

  return (
    <List.Accordion title="Events You Are Attending" titleStyle={styles.title}>
      {events.map((event) => (
        <List.Item
          title={event.title}
          key={event.id}
          onPress={() => navigateToEvent(event.id)}
        />
      ))}
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: theme.sizes[4] + theme.sizes[3],
  },
});
