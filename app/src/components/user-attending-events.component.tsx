import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import { theme } from "../theme/index.theme";
import { EventType } from "../types/event.type";

export const UserAttendingEventsComponent = () => {
  const navigator = useNavigation();

  const navigateToEvent = (event: EventType) =>
    navigator.navigate("EventsDetail", { event });

  return (
    <List.Accordion title="Events You Are Attending" titleStyle={styles.title}>
      {([] as EventType[]).map((event) => (
        <List.Item
          title={event.title}
          key={event.id}
          right={(iconProps) => (
            <TouchableOpacity onPress={() => navigateToEvent(event)}>
              <List.Icon
                {...iconProps}
                color={theme.colors.primary}
                icon="magnify"
              />
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
});
