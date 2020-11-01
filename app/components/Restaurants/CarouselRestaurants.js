import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Image, Icon } from "react-native-elements";
import Carousel from "react-native-snap-carousel";

const screenWidth = Dimensions.get("screen").width;
const ITEM_WIDTH = Math.round(screenWidth * 0.8);

const CarouselRestaurants = (props) => {
  const { restaurants, carousel, navigation, setCurrentIndex } = props;

  return (
    <Carousel
      layout={"default"}
      data={restaurants}
      sliderWidth={screenWidth}
      itemWidth={ITEM_WIDTH}
      renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
      ref={carousel}
      inactiveSlideOpacity={1}
      onSnapToItem={(index) => setCurrentIndex(index)}
    />
  );
};

const RenderItem = (props) => {
  const { data, navigation } = props;
  const { image_url, name, code, budget } = data.item;

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("restaurant", { restaurant: data.item })
      }
    >
      <View style={styles.restaurant}>
        <Text style={styles.restaurantName} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.restaurantBody}>
          <View style={styles.restaurantImageWrap}>
            <Image
              PlaceholderContent={<ActivityIndicator color="#fff" />}
              style={styles.restaurantImage}
              source={
                image_url.shop_image1.length !== 0
                  ? { uri: image_url.shop_image1 }
                  : require("../../../assets/img/no-image.png")
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
              <Text style={styles.priceText}>
                {budget ? budget + "円 (平均予算)" : "--"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  restaurant: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 8,
    marginBottom: 20,
    borderRadius: 5,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
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
    height: 70,
  },
  restaurantContent: {
    marginTop: 5,
    marginLeft: 15,
    flex: 3,
  },
  category: {
    marginBottom: 10,
    fontSize: 13,
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 2,
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
  priceText: {
    marginLeft: 3,
    fontSize: 13,
  },
});

export default CarouselRestaurants;
