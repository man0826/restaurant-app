import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RestaurantScreen from "../screens/Restaurants/RestaurantScreen";
import ReviewScreen from "../screens/Restaurants/ReviewScreen";
import TimelineScreen from "../screens/TimelineScreen";
import colors from "../constants/Colors";

const Stack = createStackNavigator();

const TimelineStack = () => {
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
        name="timeline"
        component={TimelineScreen}
        options={{ title: "タイムライン" }}
      />
      <Stack.Screen name="restaurant" component={RestaurantScreen} />
      <Stack.Screen name="review" component={ReviewScreen} />
    </Stack.Navigator>
  );
};

export default TimelineStack;
