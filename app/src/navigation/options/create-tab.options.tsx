import { MaterialTopTabBarOptions } from "@react-navigation/material-top-tabs";
import { theme } from "../../theme/index.theme";

export const CreateTabOptions: MaterialTopTabBarOptions = {
  activeTintColor: theme.colors.primary,
  inactiveTintColor: theme.colors.secondary,
  style: {
    paddingTop: theme.sizes[3],
    height: theme.sizes[14],
  },
  indicatorStyle: {
    backgroundColor: theme.colors.primary,
  },
};
