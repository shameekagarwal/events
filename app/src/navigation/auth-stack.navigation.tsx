import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LoginScreen } from "../screens/login.screen";
import { SignupScreen } from "../screens/signup.screen";

export type AuthStackParamList = {
  Signup: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={SignupScreen} name="Signup" />
    </Stack.Navigator>
  );
};
