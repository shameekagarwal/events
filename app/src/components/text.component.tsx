import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { theme } from "../theme/index.theme";

type OtherProps = {
  text: string;
  style?: TextStyle | TextStyle[];
};
type Props = OtherProps & TextProps;

export const TextComponent: React.FC<Props> = (props) => {
  const passedStyles = Array.isArray(props.style)
    ? Object.assign({}, ...props.style)
    : props.style;
  const style = { ...passedStyles, ...styles.text };

  return (
    <Text {...props} style={style}>
      {props.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.regular,
  },
});
