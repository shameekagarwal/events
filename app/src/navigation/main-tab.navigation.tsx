import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { CreateStackNavigation } from "./create-stack.navigation";
import { EventsStackNavigation } from "./events-stack.navigation";
import { MainTabOptions, MainTabIcon } from "./options/main-tab.options";
import { ProfileStackNavigation } from "./profile-stack.navigation";

export type MainTabParamList = {
  Events: undefined;
  Create: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Events"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <MainTabIcon focused={focused} route={route} />
        ),
      })}
      tabBarOptions={MainTabOptions}
    >
      <Tab.Screen name="Events" component={EventsStackNavigation} />
      <Tab.Screen name="Create" component={CreateStackNavigation} />
      <Tab.Screen name="Profile" component={ProfileStackNavigation} />
    </Tab.Navigator>
  );
};
