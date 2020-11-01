import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FavoritesScreen from "../screens/FavoritesScreen";
import RestaurantScreen from "../screens/Restaurants/RestaurantScreen";
import colors from "../constants/Colors";

const Stack = createStackNavigator();

const FavoriteStack = () => {
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
        component={FavoritesScreen}
        options={{ title: "マイリスト" }}
      />
      <Stack.Screen name="restaurant" component={RestaurantScreen} />
    </Stack.Navigator>
  );
};

export default FavoriteStack;
