import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Image, Icon, Card } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { addClip, deleteClip } from "../../store/actions/user";

const ListItemRestaurant = (props) => {
  const { restaurant, navigation } = props;
  const { name, image_url, code, access, pr, budget } = restaurant;
  const dispatch = useDispatch();
  const clipRestaurants = useSelector((state) => state.user.clips);

  const isClipped = () => {
    return clipRestaurants.some(
      (clipRestaurant) => clipRestaurant.id === restaurant.id
    );
  };

  const toggleClip = () => {
    if (!isClipped()) {
      dispatch(addClip(restaurant));
    } else {
      dispatch(deleteClip(restaurant));
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("restaurant", { restaurant })}
    >
      <View style={styles.container}>
        <Card containerStyle={styles.card}>
          {image_url.shop_image1 ? (
            image_url.shop_image2 ? (
              <View style={styles.cardImagesWrap}>
                <View style={styles.cardImageContainerLeft}>
                  <Image
                    PlaceholderContent={<ActivityIndicator color="#fff" />}
                    style={styles.cardImage}
                    source={{ uri: image_url.shop_image1 }}
                  />
                </View>
                <View style={styles.cardImageContainerRight}>
                  <Image
                    PlaceholderContent={<ActivityIndicator color="#fff" />}
                    style={styles.cardImage}
                    source={{ uri: image_url.shop_image2 }}
                  />
                </View>
              </View>
            ) : (
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={styles.cardImage}
                source={{ uri: image_url.shop_image1 }}
              />
            )
          ) : (
            <Image
              PlaceholderContent={<ActivityIndicator color="#fff" />}
              style={styles.cardImage}
              source={require("../../../assets/img/no-image.png")}
            />
          )}
          <View style={styles.cardContent}>
            <View style={styles.cardHead}>
              <Text style={styles.restaurantName}>{name}</Text>
              <View
                style={[
                  styles.favoritesIcon,
                  {
                    borderColor: isClipped() ? "#EF707B" : "#aaa",
                  },
                ]}
              >
                <Icon
                  type="material-community"
                  name={isClipped() ? "heart" : "heart-outline"}
                  onPress={toggleClip}
                  color={isClipped() ? "#EF707B" : "#aaa"}
                  size={22}
                  underlayColor="transparent"
                />
              </View>
            </View>
            <Text style={styles.categoryText}>
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
              <Text>{budget ? budget + "円 (平均予算)" : "--"}</Text>
            </View>
            <View style={styles.access}>
              <Icon
                type="material-community"
                name="train"
                color="#aaa"
                size={18}
                containerStyle={styles.accessIcon}
              />
              <Text>
                {access.walk.length !== 0
                  ? `${access.line}${access.station}${access.station_exit} ${access.walk}分`
                  : "--"}
              </Text>
            </View>
            {pr.pr_short.length !== 0 && (
              <Text style={styles.prText} numberOfLines={2}>
                {pr.pr_short}
              </Text>
            )}
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  card: {
    backgroundColor: "#fff",
    padding: 0,
    borderRadius: 7,
    overflow: "hidden",
  },
  cardImagesWrap: {
    flexDirection: "row",
    flex: 1,
  },
  cardImageContainerLeft: {
    flex: 2,
    marginRight: 1,
  },
  cardImageContainerRight: {
    flex: 2,
    marginLeft: 1,
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  cardHead: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    flex: 1,
  },
  favoritesIcon: {
    borderWidth: 1,
    borderRadius: 100,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    marginBottom: 10,
    fontSize: 12,
    color: "#999",
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 2,
    marginBottom: 5,
  },
  priceIcon: {
    backgroundColor: "#333",
    width: 14,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginRight: 6,
  },
  access: {
    flexDirection: "row",
    alignItems: "center",
  },
  accessIcon: {
    marginRight: 3,
  },
  prText: {
    marginTop: 10,
  },
});

export default ListItemRestaurant;
