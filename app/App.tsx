import {
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_700Bold,
  useFonts,
} from "@expo-google-fonts/oswald";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { Main } from "./main";
import { LoaderComponent } from "./src/components/loader.component";
import { CreateEventProvider } from "./src/context/create-event.context";
import { store } from "./src/redux/store";
import { paperTheme } from "./src/theme/index.theme";

export default () => {
  // tracking if initial auth state of user stored in async storage has been fetched

  const [fontLoaded] = useFonts({
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_700Bold,
  });

  if (!fontLoaded) {
    return <LoaderComponent />;
  }

  return (
    <ReduxProvider store={store}>
      <CreateEventProvider>
        <PaperProvider theme={paperTheme}>
          <Main />
        </PaperProvider>
        <StatusBar style="auto" />
      </CreateEventProvider>
    </ReduxProvider>
  );
};
