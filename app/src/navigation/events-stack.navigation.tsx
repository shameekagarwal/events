import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { EventDetailScreen } from "../screens/event-detail.screen";
import { EventsScreen } from "../screens/events.screen";

export type EventsStackParamList = {
  Events: undefined;
  EventsDetail: { eventId: number };
};

const Stack = createStackNavigator<EventsStackParamList>();

export const EventsStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Events" headerMode="none">
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="EventsDetail" component={EventDetailScreen} />
    </Stack.Navigator>
  );
};
