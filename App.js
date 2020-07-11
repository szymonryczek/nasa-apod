import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Container } from "native-base";
import ApodList from "./components/ApodList";
import Apod from "./components/Apod";

const Stack = createStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });
      setIsReady(true);
    }
    loadFont();
  }, []);

  if (!isReady) {
    return <AppLoading />;
  } else {
    return (
      <Container>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={ApodList}
              options={{ title: "Astronomy Image of the Day" }}
            />
            <Stack.Screen name="Detail" component={Apod} />
          </Stack.Navigator>
        </NavigationContainer>
      </Container>
    );
  }
}
