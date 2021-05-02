import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EventCardComponent } from "../components/event-card.component";
import { TextComponent } from "../components/text.component";
import { useActionsHook } from "../hooks/use-actions.hook";
import { useSelectorHook } from "../hooks/use-selector.hook";
import { EventsStackParamList } from "../navigation/events-stack.navigation";
import { theme } from "../theme/index.theme";
import { EventType } from "../types/event.type";

type NavigationProps = StackNavigationProp<EventsStackParamList, "Events">;
type Props = { navigation: NavigationProps };

export const EventsScreen: React.FC<Props> = (props) => {
  const navigateToDetail = (event: EventType) =>
    props.navigation.navigate("EventsDetail", { event });
  const { events } = useSelectorHook((state) => state.event);
  const { fetchEventsActionCreator } = useActionsHook();

  useEffect(() => {
    fetchEventsActionCreator();
  }, [fetchEventsActionCreator]);

  return (
    <View style={styles.container}>
      <TextComponent text="View And Attend Events" style={styles.heading} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={events}
        keyExtractor={(item) => `event-${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetail(item)}>
            <EventCardComponent event={item} detailed={false} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.sizes[4],
  },
  heading: {
    fontSize: theme.sizes[5],
    marginBottom: theme.sizes[3],
  },
});
