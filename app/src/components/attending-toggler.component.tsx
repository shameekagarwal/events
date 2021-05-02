import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useActionsHook } from "../hooks/use-actions.hook";
import { useSelectorHook } from "../hooks/use-selector.hook";
import { theme } from "../theme/index.theme";

type Props = {
  eventId: number;
};

export const AttendingTogglerComponent: React.FC<Props> = (props) => {
  const event = useSelectorHook((state) => state.event.events[props.eventId]);
  const user = useSelectorHook((state) => state.auth.user);
  const attending = event.attendees.includes(user!.email);

  const { toggleAttendActionCreator } = useActionsHook();
  const mode = attending ? "outlined" : "contained";
  const text = attending ? "back off" : "attend";

  return (
    <Button
      style={styles.button}
      mode={mode}
      onPress={() => toggleAttendActionCreator(event.id, user!.email)}
    >
      {text}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: theme.sizes[16],
    marginVertical: theme.sizes[5],
  },
});
