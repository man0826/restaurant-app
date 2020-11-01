import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Restaurants/HomeScreen";
import RestaurantScreen from "../screens/Restaurants/RestaurantScreen";
import ReviewScreen from "../screens/Restaurants/ReviewScreen";
import ListRestaurantsScreen from "../screens/Restaurants/ListRestaurantsScreen";
import ListCategoryScreen from "../screens/Restaurants/ListCategoryScreen";
import ListPrefScreen from "../screens/Restaurants/ListPrefScreen";
import ListAreaLargeScreen from "../screens/Restaurants/ListAreaLargeScreen";
import SearchRestaurantsScreen from "../screens/Restaurants/SearchRestaurantsScreen";
import SearchListRestaurantsScreen from "../screens/Restaurants/SearchListRestaurantsScreen";
import SearchMapScreen from "../screens/Restaurants/SearchMapScreen";
import AddReviewScreen from "../screens/Restaurants/AddReviewScreen";
import colors from "../constants/Colors";

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
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="restaurant"
        component={RestaurantScreen}
        options={{
          headerStyle: { backgroundColor: colors.primary, shadowOpacity: 0 },
        }}
      />
      <Stack.Screen name="review" component={ReviewScreen} />
      <Stack.Screen name="list-restaurants" component={ListRestaurantsScreen} />
      <Stack.Screen
        name="list-category"
        component={ListCategoryScreen}
        options={{
          headerStyle: { backgroundColor: colors.primary, shadowOpacity: 0 },
        }}
      />
      <Stack.Screen
        name="list-pref"
        component={ListPrefScreen}
        options={{
          headerStyle: { backgroundColor: colors.primary, shadowOpacity: 0 },
        }}
      />
      <Stack.Screen
        name="list-area-large"
        component={ListAreaLargeScreen}
        options={{
          headerStyle: { backgroundColor: colors.primary, shadowOpacity: 0 },
        }}
      />
      <Stack.Screen
        name="search-restaurants"
        component={SearchRestaurantsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="search-list-restaurants"
        component={SearchListRestaurantsScreen}
      />
      <Stack.Screen
        name="search-map"
        component={SearchMapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="add-review"
        component={AddReviewScreen}
        options={{ title: "口コミ投稿" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
