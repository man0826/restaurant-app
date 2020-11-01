import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Image, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { addClip, deleteClip } from "../store/actions/user";

const FavoritesScreen = (props) => {
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
    <View>
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
        <View style={styles.notMyList}>
          <Text>まだマイリストはありません。</Text>
        </View>
      )}
    </View>
  );
};

const Restaurant = (props) => {
  const { restaurant, navigation, isClipped, toggleClip } = props;
  const { name, image_url, code, access, budget } = restaurant;

  const enabled = isClipped(restaurant);

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("restaurant", { restaurant })}
    >
      <View style={styles.restaurant}>
        <View style={styles.restaurantInner}>
          <View style={styles.restaurantHead}>
            <Text style={styles.restaurantName}>{name}</Text>
            <View
              style={[
                styles.favorites,
                { borderColor: enabled ? "#EF707B" : "#000" },
              ]}
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
          <View style={styles.restaurantBody}>
            <View style={styles.restaurantImageWrap}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={styles.restaurantImage}
                source={
                  image_url.shop_image1.length !== 0
                    ? { uri: image_url.shop_image1 }
                    : require("../../assets/img/no-image.png")
                }
              />
            </View>
            <View style={styles.restaurantContent}>
              <Text style={styles.category}>
                {code.category_name_l.join("　")}
              </Text>
              <View style={styles.price}>
                <Icon
                  type="font-awesome"
                  name="yen"
                  size={13}
                  containerStyle={styles.priceIcon}
                  color="#fff"
                />
                <Text style={styles.contentText}>
                  {budget ? budget + "円 (平均予算)" : "--"}
                </Text>
              </View>
              <View style={styles.access}>
                <Icon
                  type="material-community"
                  name="train"
                  color="#aaa"
                  size={18}
                />
                <Text style={styles.contentText}>
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

const styles = StyleSheet.create({
  notMyList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  restaurant: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  restaurantInner: {
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  restaurantHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    flex: 1,
  },
  favorites: {
    borderWidth: 1,
    borderRadius: 100,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  restaurantBody: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  restaurantImageWrap: {
    flex: 1,
  },
  restaurantImage: {
    width: "100%",
    height: 90,
    borderRadius: 5,
  },
  restaurantContent: {
    marginLeft: 10,
    flex: 3,
  },
  category: {
    marginBottom: 20,
    fontSize: 13,
    color: "#999",
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 3,
    marginBottom: 10,
  },
  priceIcon: {
    backgroundColor: "#333",
    width: 14,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginRight: 2,
  },
  contentText: {
    fontSize: 13,
    marginLeft: 5,
  },
  access: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginRight: 20,
  },
});

export default FavoritesScreen;
