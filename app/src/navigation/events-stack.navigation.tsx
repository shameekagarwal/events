import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { EventDetailScreen } from "../screens/event-detail.screen";
import { EventsScreen } from "../screens/events.screen";
import { EventType } from "../types/event.type";

export type EventsStackParamList = {
  Events: undefined;
  EventsDetail: { event: EventType };
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
