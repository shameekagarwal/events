import { DefaultTheme } from "react-native-paper";
import { colors } from "./colors.theme";
import { fonts } from "./fonts.theme";
import { sizes } from "./sizes.theme";

export const theme = {
  colors,
  sizes,
  fonts,
};

export const paperTheme: typeof DefaultTheme = {
  ...DefaultTheme,
  fonts: {
    thin: {
      fontFamily: theme.fonts.extraLight,
    },
    light: {
      fontFamily: theme.fonts.light,
    },
    regular: {
      fontFamily: theme.fonts.light,
    },
    medium: {
      fontFamily: theme.fonts.regular,
    },
  },
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
    primary: theme.colors.primary,
  },
};
