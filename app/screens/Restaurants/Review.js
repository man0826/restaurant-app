import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Rating, Avatar, Image, Icon } from "react-native-elements";

import { getRestaurantApi } from "../../api/restaurants";
import colors from "../../utils/colors";

const screenWidth = Dimensions.get("window").width;

const Review = (props) => {
  const { route, navigation } = props;
  const { review } = route.params;
  const {
    reviewText,
    rating,
    createAt,
    avatarUser,
    nameUser,
    imagesRestaurant,
    title,
    nameRestaurant,
    idRestaurant,
  } = review;
  const [restaurant, setRestaurant] = useState(null);

  navigation.setOptions({
    title: nameUser ? nameUser + "さんの投稿" : "投稿",
    headerLeft: () => (
      <Icon
        name="chevron-left"
        type="entypo"
        color="#000"
        size={35}
        containerStyle={{ marginLeft: 5 }}
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
  });

  useEffect(() => {
    getRestaurantApi(idRestaurant).then((response) => {
      setRestaurant(...response.rest);
    });
  }, []);

  const createReview = new Date(createAt.seconds * 1000);

  return (
    <ScrollView style={styles.viewReview}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <View style={styles.viewImageAvatar}>
            <Avatar
              size="large"
              rounded
              containerStyle={styles.imageAvatarUser}
              source={
                avatarUser
                  ? { uri: avatarUser }
                  : require("../../../assets/img/avatar-default.jpg")
              }
            />
          </View>
          <Text style={styles.reviewName}>{nameUser}</Text>
        </View>
        <View
          style={{
            marginBottom: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Rating
              type="custom"
              ratingColor={colors.primary}
              imageSize={15}
              startingValue={rating}
              readonly
            />
            <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 18 }}>
              {rating.toFixed(1)}
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("restaurant", { restaurant: restaurant })
          }
        >
          <View
            style={{
              backgroundColor: "#eee",
              paddingHorizontal: 10,
              paddingVertical: 10,
              marginBottom: 15,
              borderRadius: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ marginRight: 10, flex: 1 }}>{nameRestaurant}</Text>
            <Icon type="entypo" name="chevron-right" color="#aaa" />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.reviewDate}>
          投稿日時：
          {createReview.getFullYear()}/{createReview.getMonth() + 1}/
          {createReview.getDate()} {createReview.getHours()}:
          {createReview.getMinutes() < 10 ? "0" : ""}
          {createReview.getMinutes()}
        </Text>
        <Text style={styles.reviewTitle}>{title}</Text>
        <Text style={styles.reviewText}>{reviewText}</Text>
      </View>
      {imagesRestaurant.length !== 0 && (
        <FlatList
          style={{ marginBottom: 40 }}
          data={imagesRestaurant}
          numColumns={2}
          renderItem={({ item }) => <ImagesRestaurant imageUrl={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </ScrollView>
  );
};

const ImagesRestaurant = (props) => {
  const { imageUrl } = props;

  return (
    <View style={{ flex: 2, margin: 1 }}>
      <Image
        PlaceholderContent={<ActivityIndicator color="#fff" />}
        style={{ width: screenWidth / 2.1, height: 170 }}
        source={{ uri: imageUrl }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewReview: {
    backgroundColor: "#fff",
    padding: 10,
  },
  viewImageAvatar: {
    marginRight: 10,
  },
  imageAvatarUser: {
    width: 40,
    height: 40,
  },
  reviewTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewText: {
    paddingTop: 2,
    marginBottom: 30,
    lineHeight: 20,
  },
  reviewDate: {
    marginBottom: 15,
    color: "grey",
    fontSize: 12,
  },
  reviewName: {
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default Review;
