import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ProfileScreen } from "../screens/profile.screen";

export type ProfileStackParamList = {
  Profile: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" headerMode="none">
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
