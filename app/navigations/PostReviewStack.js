import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostReviewScreen from "../screens/PostReview/PostReivewScreen";
import ReviewScreen from "../screens/Restaurants/ReviewScreen";
import RestaurantScreen from "../screens/Restaurants/RestaurantScreen";
import PageLoginScreen from "../screens/Account/PageLoginScreen";
import AddReviewScreen from "../screens/Restaurants/AddReviewScreen";
import colors from "../constants/Colors";

const Stack = createStackNavigator();

const PostReviewStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: { color: "#000", fontWeight: "bold", fontSize: 17 },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="post-review"
        component={PostReviewScreen}
        options={{ title: "オススメのお店を投稿する" }}
      />
      <Stack.Screen name="review" component={ReviewScreen} />
      <Stack.Screen name="restaurant" component={RestaurantScreen} />
      <Stack.Screen
        name="page-login"
        component={PageLoginScreen}
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

export default PostReviewStack;
