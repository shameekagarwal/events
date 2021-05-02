import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { CreateStep1Screen } from "../screens/create-step1.screen";
import { CreateStep2Screen } from "../screens/create-step2.screen";
import { CreateStep3Screen } from "../screens/create-step3.screen";
import { CreateTabOptions } from "./options/create-tab.options";

export type CreateTabParamList = {
  Step1: undefined;
  Step2: undefined;
  Step3: undefined;
};

const Tab = createMaterialTopTabNavigator<CreateTabParamList>();

export const CreateTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Step1" tabBarOptions={CreateTabOptions}>
      <Tab.Screen
        name="Step1"
        component={CreateStep1Screen}
        options={{ title: "step  1" }}
      />
      <Tab.Screen
        name="Step2"
        component={CreateStep2Screen}
        options={{ title: "step  2" }}
      />
      <Tab.Screen
        name="Step3"
        component={CreateStep3Screen}
        options={{ title: "step  3" }}
      />
    </Tab.Navigator>
  );
};
