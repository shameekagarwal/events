import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import { theme } from "../theme/index.theme";
import { EventType } from "../types/event.type";
import { DetailsComponent } from "./details.component";

type OtherProps = {
  event: EventType;
  detailed: boolean;
};
type Props = OtherProps;

export const EventCardComponent: React.FC<Props> = (props) => {
  const cardStyle = props.detailed ? {} : styles.card;

  return (
    <Card style={cardStyle} elevation={5}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.cardDetailed}
      >
        <Card.Cover style={styles.image} source={{ uri: props.event.image }} />
        <Card.Content>
          <Card.Title
            style={styles.title}
            title={props.event.title.toUpperCase()}
            subtitle={props.event.date}
          />
          {props.detailed && <DetailsComponent event={props.event} />}
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
