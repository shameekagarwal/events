import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { AuthComponent } from "../components/auth.component";
import { useActionsHook } from "../hooks/use-actions.hook";
import { AuthStackParamList } from "../navigation/auth-stack.navigation";

type NavigationProps = StackNavigationProp<AuthStackParamList, "Login">;
type Props = { navigation: NavigationProps };

export const SignupScreen: React.FC<Props> = (props) => {
  const { signupActionCreator } = useActionsHook();
  const onNavigate = () => props.navigation.navigate("Login");

  return (
    <AuthComponent
      onSubmit={signupActionCreator}
      heading="signup"
      navigationText="go to login"
      onNavigate={onNavigate}
    />
  );
};
