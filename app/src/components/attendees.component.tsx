import React from "react";
import { StyleSheet } from "react-native";
import { List } from "react-native-paper";
import { theme } from "../theme/index.theme";
import { EventType } from "../types/event.type";

type OtherProps = {
  attendees: EventType["attendees"];
};
type Props = OtherProps;

export const AttendeesComponent: React.FC<Props> = (props) => {
  const lastAttendeeIndex = props.attendees.length - 1;
  return (
    <List.Accordion title="Attendees" style={styles.accordion}>
      {props.attendees.map((attendee, index) => {
        const attendeeStyle =
          index === lastAttendeeIndex
            ? [styles.attendee, styles.extraBottom]
            : styles.attendee;
        return (
          <List.Item
            key={`attendee-${index}`}
            style={attendeeStyle}
            title={attendee}
          />
        );
      })}
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  accordion: {
    padding: 0,
    marginTop: theme.sizes[3],
    marginLeft: -theme.sizes[2],
    marginBottom: theme.sizes[3],
  },
  attendee: {
    padding: 0,
    paddingLeft: theme.sizes[4],
  },
  extraBottom: {
    paddingBottom: theme.sizes[4],
  },
});
