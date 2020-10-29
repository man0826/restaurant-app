import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostReview from "../screens/PostReview/PostReivew";
import Review from "../screens/Restaurants/Review";
import Restaurant from "../screens/Restaurants/Restaurant";
import PageLogin from "../screens/Account/PageLogin";
import AddReview from "../screens/Restaurants/AddReview";
import colors from "../utils/colors";

const Stack = createStackNavigator();

export default function PostReviewStack() {
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
        component={PostReview}
        options={{ title: "オススメのお店を投稿する" }}
      />
      <Stack.Screen name="review" component={Review} />
      <Stack.Screen name="restaurant" component={Restaurant} />
      <Stack.Screen
        name="page-login"
        component={PageLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="add-review"
        component={AddReview}
        options={{ title: "口コミ投稿" }}
      />
    </Stack.Navigator>
  );
}
