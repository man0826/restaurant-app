import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Image, Icon } from "react-native-elements";
import Carousel from "react-native-snap-carousel";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = Math.round(width * 0.8);

const CarouselMap = (props) => {
  const { restaurants, carousel, navigation, setCurrentIndex } = props;

  return (
    <Carousel
      layout={"default"}
      data={restaurants}
      sliderWidth={width}
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
      <View
        style={{
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
        }}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
          numberOfLines={1}
        >
          {name}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <Image
            style={{ width: "100%", height: 80 }}
            resizeMode="cover"
            source={
              image_url.shop_image1
                ? { uri: image_url.shop_image1 }
                : require("../../assets/img/no-image.png")
            }
          />
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <View style={{ flex: 1 }}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 75 }}
                source={
                  image_url.shop_image1.length !== 0
                    ? { uri: image_url.shop_image1 }
                    : require("../../assets/img/no-image.png")
                }
              />
            </View>
            <View
              style={{
                marginTop: 5,
                marginLeft: 15,
                flex: 3,
              }}
            >
              <Text style={{ marginBottom: 10, fontSize: 13 }}>
                {code.category_name_l.join("　")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 2,
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
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CarouselMap;
