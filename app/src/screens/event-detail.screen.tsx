import { RouteProp } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View } from "react-native";
import { EventCardComponent } from "../components/event-card.component";
import { EventsStackParamList } from "../navigation/events-stack.navigation";
import { theme } from "../theme/index.theme";

type RouteProps = RouteProp<EventsStackParamList, "EventsDetail">;
type Props = { route: RouteProps };

export const EventDetailScreen: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <EventCardComponent detailed={true} event={props.route.params.event} />
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
