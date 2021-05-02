import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { LoaderComponent } from "./src/components/loader.component";
import { useActionsHook } from "./src/hooks/use-actions.hook";
import { useSelectorHook } from "./src/hooks/use-selector.hook";
import { AuthStackNavigation } from "./src/navigation/auth-stack.navigation";
import { MainTabNavigation } from "./src/navigation/main-tab.navigation";

export const Main = () => {
  const { user, intialLoading } = useSelectorHook((state) => state.auth);
  const { verifyUserActionCreator } = useActionsHook();

  // this is why useActionsHook had to use useMemo
  useEffect(() => {
    verifyUserActionCreator();
  }, [verifyUserActionCreator]);

  if (intialLoading) {
    return <LoaderComponent />;
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {user && <MainTabNavigation />}
        {!user && <AuthStackNavigation />}
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
