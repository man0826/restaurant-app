import React from "react";
import {
  FlatList,
  View,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Image, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { addClip, deleteClip } from "../store/actions/user";

const Favorites = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const clipRestaurants = useSelector((state) => state.user.clips);

  const isClipped = (restaurant) => {
    return clipRestaurants.some(
      (clipRestaurant) => clipRestaurant.id === restaurant.id
    );
  };

  const toggleClip = (enabled, restaurant) => {
    if (!enabled) {
      dispatch(addClip(restaurant));
    } else {
      dispatch(deleteClip(restaurant));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {clipRestaurants.length !== 0 ? (
        <FlatList
          data={clipRestaurants}
          renderItem={({ item }) => (
            <Restaurant
              restaurant={item}
              navigation={navigation}
              isClipped={isClipped}
              toggleClip={toggleClip}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>まだマイリストはありません。</Text>
        </View>
      )}
    </View>
  );
};

const Restaurant = (props) => {
  const { restaurant, navigation, isClipped, toggleClip } = props;
  const { name, image_url, code, access, pr, budget } = restaurant;

  const enabled = isClipped(restaurant);

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("restaurant", { restaurant })}
    >
      <View
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            borderBottomColor: "#e3e3e3",
            borderBottomWidth: 1,
            paddingVertical: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginRight: 10,
                flex: 1,
              }}
            >
              {name}
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: enabled ? "#EF707B" : "#000",
                borderRadius: 100,
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                type="material-community"
                name={enabled ? "heart" : "heart-outline"}
                onPress={() => toggleClip(enabled, restaurant)}
                color={enabled ? "#EF707B" : "#000"}
                size={22}
                underlayColor="transparent"
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <View style={{ flex: 1 }}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 90, borderRadius: 5 }}
                style={{ width: "100%", height: 90 }}
                source={
                  image_url.shop_image1.length !== 0
                    ? { uri: image_url.shop_image1 }
                    : require("../../assets/img/no-image.png")
                }
              />
            </View>
            <View
              style={{
                marginLeft: 10,
                flex: 3,
              }}
            >
              <Text style={{ marginBottom: 20, fontSize: 13, color: "#999" }}>
                {code.category_name_l.join("　")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 3,
                  marginBottom: 10,
                }}
              >
                <Icon
                  type="font-awesome"
                  name="yen"
                  size={13}
                  containerStyle={{
                    backgroundColor: "#333",
                    width: 14,
                    height: 16,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 2,
                    marginRight: 2,
                  }}
                  color="#fff"
                />
                <Text style={{ marginLeft: 3, fontSize: 13 }}>
                  {budget ? budget + "円 (平均予算)" : "--"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginRight: 20,
                }}
              >
                <Icon
                  type="material-community"
                  name="train"
                  color="#aaa"
                  size={18}
                />
                <Text style={{ marginLeft: 3, fontSize: 13 }}>
                  {access.walk.length !== 0
                    ? `${access.line}${access.station}${access.station_exit} ${access.walk}分`
                    : "--"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Favorites;
