import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EventCardComponent } from "../components/event-card.component";
import { LoaderComponent } from "../components/loader.component";
import { TextComponent } from "../components/text.component";
import { useActionsHook } from "../hooks/use-actions.hook";
import { useSelectorHook } from "../hooks/use-selector.hook";
import { EventsStackParamList } from "../navigation/events-stack.navigation";
import { theme } from "../theme/index.theme";

type NavigationProps = StackNavigationProp<EventsStackParamList, "Events">;
type Props = { navigation: NavigationProps };

export const EventsScreen: React.FC<Props> = (props) => {
  const navigateToDetail = (eventId: number) =>
    props.navigation.navigate("EventsDetail", { eventId });
  const { events, loading } = useSelectorHook((state) => state.event);
  const { fetchEventsActionCreator } = useActionsHook();

  useEffect(() => {
    fetchEventsActionCreator();
  }, [fetchEventsActionCreator]);

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <View style={styles.container}>
      <TextComponent text="View And Attend Events" style={styles.heading} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Object.values(events)}
        keyExtractor={(item) => `event-${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetail(item.id)}>
            <EventCardComponent eventId={item.id} detailed={false} />
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
