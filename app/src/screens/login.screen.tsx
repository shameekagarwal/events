import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { AuthComponent } from "../components/auth.component";
import { useActionsHook } from "../hooks/use-actions.hook";
import { AuthStackParamList } from "../navigation/auth-stack.navigation";

type NavigationProps = StackNavigationProp<AuthStackParamList, "Login">;
type Props = { navigation: NavigationProps };

export const LoginScreen: React.FC<Props> = (props) => {
  const { loginActionCreator } = useActionsHook();
  const onNavigate = () => props.navigation.navigate("Signup");

  return (
    <AuthComponent
      heading="login"
      navigationText="go to signup"
      onNavigate={onNavigate}
      onSubmit={loginActionCreator}
    />
  );
};
