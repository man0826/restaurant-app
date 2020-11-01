import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/Account/AccountScreen";
import LoginScreen from "../screens/Account/LoginScreen";
import UserLoggedScreen from "../screens/Account/UserLoggedScreen";
import AccountInfoChagneScreen from "../screens/Account/AccountInfoChangeScreen";
import ChangeNameScreen from "../screens/Account/ChangeNameScreen";
import ChangeEmailScreen from "../screens/Account/ChangeEmailScreen";
import ChangePasswordScreen from "../screens/Account/ChangePasswordScreen";
import MyReviewsScreen from "../screens/Account/MyReviewsScreen";
import ReviewScreen from "../screens/Restaurants/ReviewScreen";
import RestaurantScreen from "../screens/Restaurants/RestaurantScreen";
import PageLoginScreen from "../screens/Account/PageLoginScreen";
import PageRegisterScreen from "../screens/Account/PageRegisterScreen";
import colors from "../constants/Colors";

const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: "#000",
          fontWeight: "bold",
          fontSize: 17,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen
        name="user-logged"
        component={UserLoggedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="account-info-change"
        component={AccountInfoChagneScreen}
        options={{ title: "会員情報の登録・変更" }}
      />
      <Stack.Screen
        name="change-name"
        component={ChangeNameScreen}
        options={{ title: "お名前の登録・変更" }}
      />
      <Stack.Screen
        name="change-email"
        component={ChangeEmailScreen}
        options={{ title: "メールアドレスの変更" }}
      />
      <Stack.Screen
        name="change-password"
        component={ChangePasswordScreen}
        options={{ title: "パスワードの変更" }}
      />
      <Stack.Screen
        name="my-reviews"
        component={MyReviewsScreen}
        options={{
          title: "マイレビュー",
          headerStyle: {
            backgroundColor: colors.primary,
            shadowColor: "#000",
            shadowRadius: 3,
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 2 },
          },
        }}
      />
      <Stack.Screen name="restaurant" component={RestaurantScreen} />
      <Stack.Screen
        name="page-login"
        component={PageLoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="page-register"
        component={PageRegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="review"
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
            shadowColor: "#000",
            shadowRadius: 3,
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 2 },
          },
        }}
        component={ReviewScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
