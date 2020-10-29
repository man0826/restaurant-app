import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Favorites from "../screens/Favorites";
import Restaurant from "../screens/Restaurants/Restaurant";
import colors from "../utils/colors";

const Stack = createStackNavigator();

export default function FavoriteStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          shadowColor: "#000",
          shadowRadius: 3,
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
        },
        headerTitleStyle: { color: "#000", fontWeight: "bold", fontSize: 17 },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="favorites"
        component={Favorites}
        options={{ title: "マイリスト" }}
      />
      <Stack.Screen name="restaurant" component={Restaurant} />
    </Stack.Navigator>
  );
}
