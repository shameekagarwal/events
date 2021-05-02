import { RouteProp, useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View } from "react-native";
import { EventCardComponent } from "../components/event-card.component";
import { LoaderComponent } from "../components/loader.component";
import { useSelectorHook } from "../hooks/use-selector.hook";
import { EventsStackParamList } from "../navigation/events-stack.navigation";
import { theme } from "../theme/index.theme";

type RouteProps = RouteProp<EventsStackParamList, "EventsDetail">;
type Props = { route: RouteProps };

export const EventDetailScreen: React.FC<Props> = (props) => {
  const navigator = useNavigation();

  const loading = useSelectorHook((state) => state.event.loading);

  if (loading) {
    return <LoaderComponent />;
  }
  if (!props.route.params.eventId) {
    navigator.navigate("Events");
  }

  return (
    <View style={styles.container}>
      <EventCardComponent
        detailed={true}
        eventId={props.route.params.eventId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: theme.sizes[5],
    marginBottom: theme.sizes[3],
  },
});
