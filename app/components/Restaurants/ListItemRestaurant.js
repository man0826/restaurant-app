import React from "react";
import {
  View,
  Text,
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
      <View
        style={{
          shadowColor: "#000",
          shadowRadius: 3,
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 3 },
          elevation: 5,
        }}
      >
        <Card
          containerStyle={{
            backgroundColor: "#fff",
            padding: 0,
            borderRadius: 7,
            overflow: "hidden",
          }}
        >
          {image_url.shop_image1 ? (
            image_url.shop_image2 ? (
              <View style={{ flexDirection: "row", flex: 1 }}>
                <View style={{ flex: 2, marginRight: 1 }}>
                  <Image
                    PlaceholderContent={<ActivityIndicator color="#fff" />}
                    style={{
                      width: "100%",
                      height: 150,
                      flex: 2,
                      marginRight: 1,
                    }}
                    source={{ uri: image_url.shop_image1 }}
                  />
                </View>
                <View style={{ flex: 2, marginLeft: 1 }}>
                  <Image
                    PlaceholderContent={<ActivityIndicator color="#fff" />}
                    style={{ width: "100%", height: 150 }}
                    source={{ uri: image_url.shop_image2 }}
                  />
                </View>
              </View>
            ) : (
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 150 }}
                source={{ uri: image_url.shop_image1 }}
              />
            )
          ) : (
            <Image
              PlaceholderContent={<ActivityIndicator color="#fff" />}
              style={{ width: "100%", height: 150 }}
              source={require("../../../assets/img/no-image.png")}
            />
          )}
          <View
            style={{ paddingTop: 15, paddingBottom: 20, paddingHorizontal: 10 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
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
                  borderColor: isClipped() ? "#EF707B" : "#aaa",
                  borderRadius: 100,
                  width: 35,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
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
            <Text style={{ marginBottom: 10, fontSize: 12, color: "#999" }}>
              {code.category_name_l.join("　")}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 2,
                marginBottom: 5,
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
              <Text style={{ marginLeft: 3 }}>
                {budget ? budget + "円 (平均予算)" : "--"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon
                type="material-community"
                name="train"
                color="#aaa"
                size={18}
              />
              <Text style={{ marginLeft: 3 }}>
                {access.walk.length !== 0
                  ? `${access.line}${access.station}${access.station_exit} ${access.walk}分`
                  : "--"}
              </Text>
            </View>
            {pr.pr_short.length !== 0 && (
              <Text style={{ marginTop: 10 }} numberOfLines={2}>
                {pr.pr_short}
              </Text>
            )}
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ListItemRestaurant;
