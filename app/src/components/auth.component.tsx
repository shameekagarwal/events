import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { theme } from "../theme/index.theme";
import { AuthCredentialsType } from "../types/auth-credentials.type";
import { TextComponent } from "./text.component";

type OtherProps = {
  heading: string;
  navigationText: string;
  onNavigate: () => void;
  onSubmit: (data: AuthCredentialsType) => any;
};
type Props = OtherProps;

export const AuthComponent: React.FC<Props> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dismissKeyboard = () => Keyboard.dismiss();
  const onSubmit = () => props.onSubmit({ email, password });

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <TextComponent style={styles.heading} text={props.heading} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          label="Email"
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          label="Password"
        />
        <Button style={styles.buttonTop} mode="contained" onPress={onSubmit}>
          {props.heading}
        </Button>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={props.onNavigate}
        >
          {props.navigationText}
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.sizes[8],
    paddingTop: theme.sizes[14],
  },
  input: {
    marginTop: theme.sizes[3],
  },
  button: {
    marginTop: theme.sizes[3],
    alignSelf: "center",
    width: theme.sizes[18],
  },
  buttonTop: {
    marginTop: theme.sizes[7],
    alignSelf: "center",
    width: theme.sizes[18],
  },
  heading: {
    fontSize: theme.sizes[8],
    alignSelf: "center",
    marginBottom: theme.sizes[6],
  },
});
