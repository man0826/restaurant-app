import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Restaurant from "../screens/Restaurants/Restaurant";
import Review from "../screens/Restaurants/Review";
import Timeline from "../screens/Timeline";
import colors from "../utils/colors";

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
        component={Timeline}
        options={{ title: "タイムライン" }}
      />
      <Stack.Screen name="restaurant" component={Restaurant} />
      <Stack.Screen name="review" component={Review} />
    </Stack.Navigator>
  );
};

export default TimelineStack;
