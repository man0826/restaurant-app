import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import HomeStack from "./HomeStack";
import FavoritesStack from "./FavoritesStack";
import PostReviewStack from "./PostReviewStack";
import TimelineStack from "./TimelineStack";
import AccountStack from "./AccountStack";
import colors from "../utils/colors";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        inactiveTintColor: "#646464",
        activeTintColor: colors.primary,
      }}
      screenOptions={({ route }) => {
        let index;
        let routeName = "";
        if (route.state) {
          index = route.state.index;
          routeName = route.state.routes[index].name;
        }

        return {
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarVisible:
            routeName !== "restaurant" &&
            routeName !== "review" &&
            routeName !== "add-review" &&
            routeName !== "page-login" &&
            routeName !== "page-register" &&
            routeName !== "search-map",
        };
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeStack}
        options={{ title: "ホーム" }}
      />
      <Tab.Screen
        name="favorites"
        component={FavoritesStack}
        options={{ title: "マイリスト" }}
      />
      <Tab.Screen
        name="timeline"
        component={TimelineStack}
        options={{
          title: "タイムライン",
        }}
      />
      <Tab.Screen
        name="post-review"
        component={PostReviewStack}
        options={{ title: "投稿する" }}
      />
      <Tab.Screen
        name="account"
        component={AccountStack}
        options={{ title: "マイページ" }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default Navigation;

function screenOptions(route, color) {
  let iconName;
  let iconType;

  switch (route.name) {
    case "home":
      iconType = "material-community";
      iconName = "home-outline";
      break;
    case "favorites":
      iconType = "material-community";
      iconName = "heart-outline";
      break;
    case "timeline":
      iconType = "ionicon";
      iconName = "md-time";
      break;
    case "post-review":
      iconType = "material-community";
      iconName = "camera";
      break;
    case "account":
      iconType = "ionicon";
      iconName = "md-person";
      break;
    default:
      break;
  }
  return <Icon type={iconType} name={iconName} size={22} color={color} />;
}
