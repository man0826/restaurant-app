import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Restaurants/Home";
import Restaurant from "../screens/Restaurants/Restaurant";
import Review from "../screens/Restaurants/Review";
import ListRestaurants from "../screens/Restaurants/ListRestaurants";
import ListCategory from "../screens/Restaurants/ListCategory";
import ListPref from "../screens/Restaurants/ListPref";
import ListAreaLarge from "../screens/Restaurants/ListAreaLarge";
import SearchRestaurants from "../screens/Restaurants/SearchRestaurants";
import SearchListRestaurants from "../screens/Restaurants/SearchListRestaurants";
import SearchMap from "../screens/Restaurants/SearchMap";
import AddReview from "../screens/Restaurants/AddReview";
import colors from "../utils/colors";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          shadowColor: "#000",
          shadowRadius: 3,
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        },
        headerTitleStyle: { color: "#000", fontWeight: "bold", fontSize: 17 },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="restaurant"
        component={Restaurant}
        options={{
          headerStyle: { backgroundColor: colors.primary, shadowOpacity: 0 },
        }}
      />
      <Stack.Screen name="review" component={Review} />
      <Stack.Screen name="list-restaurants" component={ListRestaurants} />
      <Stack.Screen
        name="list-category"
        component={ListCategory}
        options={{
          headerStyle: { backgroundColor: colors.primary, shadowOpacity: 0 },
        }}
      />
      <Stack.Screen
        name="list-pref"
        component={ListPref}
        options={{
          headerStyle: { backgroundColor: colors.primary, shadowOpacity: 0 },
        }}
      />
      <Stack.Screen
        name="list-area-large"
        component={ListAreaLarge}
        options={{
          headerStyle: { backgroundColor: colors.primary, shadowOpacity: 0 },
        }}
      />
      <Stack.Screen
        name="search-restaurants"
        component={SearchRestaurants}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="search-list-restaurants"
        component={SearchListRestaurants}
      />
      <Stack.Screen
        name="search-map"
        component={SearchMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="add-review"
        component={AddReview}
        options={{ title: "口コミ投稿" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
