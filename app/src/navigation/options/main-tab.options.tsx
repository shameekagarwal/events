import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarOptions } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { MainTabParamList } from "../main-tab.navigation";
import { theme } from "../../theme/index.theme";

type NavigationProps = { focused: boolean };
type RouteProps = RouteProp<MainTabParamList, keyof MainTabParamList>;
type Props = NavigationProps & { route: RouteProps };

const iconsMap: { [key: string]: { active: string; inactive: string } } = {
  Events: {
    active: "beer-sharp",
    inactive: "beer-outline",
  },
  Create: {
    active: "add-circle-sharp",
    inactive: "add-circle-outline",
  },
  Profile: {
    active: "person-sharp",
    inactive: "person-outline",
  },
};

export const MainTabIcon: React.FC<Props> = (props) => {
  const { focused, route } = props;
  const state = focused ? "active" : "inactive";
  const iconName = iconsMap[route.name][state];
  const color = focused ? theme.colors.primary : theme.colors.secondary;

  return <Ionicons size={25} name={iconName as any} color={color} />;
};

export const MainTabOptions: BottomTabBarOptions = {
  activeTintColor: theme.colors.primary,
  inactiveTintColor: theme.colors.secondary,
  style: {
    paddingBottom: theme.sizes[3],
    height: theme.sizes[15],
  },
};
