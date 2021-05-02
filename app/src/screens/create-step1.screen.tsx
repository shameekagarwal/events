import DateTimePicker from "@react-native-community/datetimepicker";
import React, { SyntheticEvent, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { CreateStepContainerComponent } from "../components/create-step-container.component";
import { TextComponent } from "../components/text.component";
import { useCreateEventHook } from "../hooks/use-create-event.hook";
import { theme } from "../theme/index.theme";
import { getIsoDateUtil } from "../utils/get-iso-date.util";

type Event = SyntheticEvent<Readonly<{ timestamp: number }>>;

export const CreateStep1Screen = () => {
  const [showDate, setShowDate] = useState(false);
  const context = useCreateEventHook();

  const onDateChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate
      ? selectedDate.toISOString()
      : getIsoDateUtil();
    setShowDate(false);
    context.setDate(currentDate);
  };

  const onShowDatePress = () => setShowDate(true);
  const displayDate = new Date(context.date).toDateString();

  return (
    <CreateStepContainerComponent header="Mention All Details">
      <>
        <TextInput
          style={styles.input}
          value={context.title}
          onChangeText={context.setTitle}
          label="Title Of Event"
        />
        <TextInput
          style={styles.input}
          value={context.description}
          onChangeText={context.setDescription}
          label="Description Of Event"
        />
        <TextComponent
          style={styles.date}
          text={`EVENT DATE :   ${displayDate}`}
        />
        <Button
          onPress={onShowDatePress}
          style={styles.button}
          mode="contained"
        >
          pick date
        </Button>
        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(context.date)}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </>
    </CreateStepContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginBottom: theme.sizes[4],
  },
  button: {
    marginTop: theme.sizes[4],
    width: theme.sizes[16],
  },
  date: {
    marginTop: theme.sizes[4],
  },
});
