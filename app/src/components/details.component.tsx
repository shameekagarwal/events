import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { useSelectorHook } from "../hooks/use-selector.hook";
import { theme } from "../theme/index.theme";
import { AttendeesComponent } from "./attendees.component";
import { AttendingTogglerComponent } from "./attending-toggler.component";
import { MapComponent } from "./map.component";
import { TextComponent } from "./text.component";

type OtherProps = {
  eventId: number;
};
type Props = OtherProps;

export const DetailsComponent: React.FC<Props> = (props) => {
  const event = useSelectorHook((state) => state.event.events[props.eventId]);
  const navigation = useNavigation();

  if (!event) {
    navigation.navigate("Events");
  }

  return (
    <>
      <TextComponent text={event.description} style={styles.description} />
      <MapComponent
        coordinates={{
          latitude: event.latitude,
          longitude: event.longitude,
        }}
      />
      <AttendeesComponent attendees={event.attendees} />
      <Card.Title
        style={styles.organiser}
        title="Organiser"
        subtitle={event.organizerEmail}
      />
      <AttendingTogglerComponent eventId={event.id} />
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
