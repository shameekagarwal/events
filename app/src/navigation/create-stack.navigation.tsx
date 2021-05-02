import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { CreateScreen } from "../screens/create.screen";

export type CreateStackParamList = {
  Create: undefined;
};

const Stack = createStackNavigator<CreateStackParamList>();

export const CreateStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Create" headerMode="none">
      <Stack.Screen name="Create" component={CreateScreen} />
    </Stack.Navigator>
  );
};
