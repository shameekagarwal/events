import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { theme } from "../theme/index.theme";
import { TextComponent } from "./text.component";

type OtherProps = {
  header: string;
};
type Props = OtherProps;

export const CreateStepContainerComponent: React.FC<Props> = (props) => {
  const [showDirections, setShowDirections] = useState(true);

  // TODO:
  // temporary fix: hide directions if keyboard focussed
  useEffect(() => {
    const keyboardDidShow = () => setShowDirections(false);
    const keyboardDidHide = () => setShowDirections(true);

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TextComponent text={props.header} style={styles.text} />
      <View style={styles.content}>{props.children}</View>
      {showDirections && (
        <TextComponent
          style={styles.directions}
          text="use the naigation on top or swipe the screen left right to naviagte through the form"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.sizes[4],
  },
  text: {
    fontSize: theme.sizes[5],
    marginBottom: theme.sizes[4],
  },
  content: {
    flex: 1,
  },
  directions: {
    fontSize: 12,
  },
});
