import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { useSelectorHook } from "../hooks/use-selector.hook";
import { theme } from "../theme/index.theme";
import { DetailsComponent } from "./details.component";

type OtherProps = {
  eventId: number;
  detailed: boolean;
};
type Props = OtherProps;

export const EventCardComponent: React.FC<Props> = (props) => {
  const cardStyle = props.detailed ? {} : styles.card;
  const event = useSelectorHook((state) => state.event.events[props.eventId]);
  const displayDate = new Date(event.date).toDateString();

  if (!event) {
    return null;
  }

  return (
    <Card style={cardStyle} elevation={5}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.cardDetailed}
      >
        <Card.Cover style={styles.image} source={{ uri: event.image }} />
        <Card.Content>
          <Card.Title
            style={styles.title}
            title={event.title.toUpperCase()}
            subtitle={displayDate}
          />
          {props.detailed && <DetailsComponent eventId={event.id} />}
        </Card.Content>
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    paddingBottom: 0,
  },
  title: {
    paddingLeft: 0,
  },
  card: {
    marginBottom: theme.sizes[4],
  },
  cardDetailed: {
    marginBottom: theme.sizes[4],
  },
});
