/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Button, ColorSchemeName, Text, View } from "react-native";

import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

export const UserContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: (_isLoggedIn: boolean) => {},
});

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function Login() {
  const { setIsLoggedIn } = React.useContext(UserContext);
  return (
    <View>
      <Button title="Login" onPress={() => setIsLoggedIn(true)} />
    </View>
  );
}

function Foo() {
  const { setIsLoggedIn } = React.useContext(UserContext);
  return (
    <View>
      <Text>Foo</Text>
      <Button title="Logout" onPress={() => setIsLoggedIn(false)} />
    </View>
  );
}

function Bar() {
  const { setIsLoggedIn } = React.useContext(UserContext);
  return (
    <View>
      <Text>Bar</Text>
      <Button title="Logout" onPress={() => setIsLoggedIn(false)} />
    </View>
  );
}

function RootNavigator() {
  const { isLoggedIn } = React.useContext(UserContext);
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "Bar" : "Login"}>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Foo"
            component={Foo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Bar"
            component={Bar}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
