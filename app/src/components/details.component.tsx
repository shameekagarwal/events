import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { theme } from "../theme/index.theme";
import { EventType } from "../types/event.type";
import { AttendeesComponent } from "./attendees.component";
import { AttendingTogglerComponent } from "./attending-toggler.component";
import { MapComponent } from "./map.component";
import { TextComponent } from "./text.component";

type OtherProps = {
  event: EventType;
};
type Props = OtherProps;

export const DetailsComponent: React.FC<Props> = (props) => {
  console.log(props.event.latitude, props.event.longitude);
  return (
    <>
      <TextComponent
        text={props.event.description}
        style={styles.description}
      />
      <MapComponent
        coordinates={{
          latitude: props.event.latitude,
          longitude: props.event.longitude,
        }}
      />
      <AttendeesComponent attendees={props.event.attendees} />
      <Card.Title
        style={styles.organiser}
        title="Organiser"
        subtitle={props.event.organizerEmail}
      />
      <AttendingTogglerComponent />
    </>
  );
};

const styles = StyleSheet.create({
  accordion: {
    padding: 0,
    marginTop: theme.sizes[3],
  },
  organiser: {
    paddingLeft: 0,
  },
  description: {
    marginVertical: theme.sizes[3],
  },
});
