import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import UserLogged from "../screens/Account/UserLogged";
import AccountInfoChagne from "../screens/Account/AccountInfoChange";
import ChangeName from "../screens/Account/ChangeName";
import ChangeEmail from "../screens/Account/ChangeEmail";
import ChangePassword from "../screens/Account/ChangePassword";
import MyReviews from "../screens/Account/MyReviews";
import Review from "../screens/Restaurants/Review";
import Restaurant from "../screens/Restaurants/Restaurant";
import PageLogin from "../screens/Account/PageLogin";
import PageRegister from "../screens/Account/PageRegister";
import colors from "../utils/colors";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff9933",
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
        component={Account}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="user-logged" component={UserLogged} />
      <Stack.Screen
        name="account-info-change"
        component={AccountInfoChagne}
        options={{ title: "会員情報の登録・変更" }}
      />
      <Stack.Screen
        name="change-name"
        component={ChangeName}
        options={{ title: "お名前の登録・変更" }}
      />
      <Stack.Screen
        name="change-email"
        component={ChangeEmail}
        options={{ title: "メールアドレスの変更" }}
      />
      <Stack.Screen
        name="change-password"
        component={ChangePassword}
        options={{ title: "パスワードの変更" }}
      />
      <Stack.Screen
        name="my-reviews"
        component={MyReviews}
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
      <Stack.Screen name="restaurant" component={Restaurant} />
      <Stack.Screen
        name="page-login"
        component={PageLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="page-register"
        component={PageRegister}
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
        component={Review}
      />
    </Stack.Navigator>
  );
}
