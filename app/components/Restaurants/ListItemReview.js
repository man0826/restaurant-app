import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Rating, Avatar } from "react-native-elements";
import colors from "../../constants/Colors";

import ImagesReview from "./ImagesReview";

const ListItemReview = (props) => {
  const { review, navigation, showRestaurantName } = props;
  const {
    reviewText,
    rating,
    createAt,
    avatarUser,
    nameUser,
    imagesRestaurant,
    title,
    nameRestaurant,
  } = review;

  const createReview = new Date(createAt.seconds * 1000);

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("review", { review })}
    >
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
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
          <View style={{ flex: 1 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.reviewName}>{nameUser}</Text>
              <Text style={styles.reviewDate}>
                投稿日時：
                {createReview.getFullYear()}/{createReview.getMonth() + 1}/
                {createReview.getDate()} {createReview.getHours()}:
                {createReview.getMinutes() < 10 ? "0" : ""}
                {createReview.getMinutes()}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Rating
                type="custom"
                ratingColor={colors.primary}
                imageSize={15}
                startingValue={rating}
                readonly
              />
              <Text
                style={{ marginLeft: 10, fontWeight: "bold", fontSize: 18 }}
              >
                {rating.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.reviewTitle}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>{title}</Text>
        </View>
        <View style={{ marginBottom: 15 }}>
          {reviewText.length > 70 ? (
            <Text style={{ lineHeight: 20 }}>
              {reviewText.substring(0, 67) + "...　"}
              <Text style={{ color: "#1d54a7" }}>詳細を見る</Text>
            </Text>
          ) : (
            <Text>{reviewText}</Text>
          )}
        </View>
        {imagesRestaurant.length !== 0 && (
          <ImagesReview images={imagesRestaurant} />
        )}
        {showRestaurantName && (
          <Text
            style={{
              marginTop: 12,
              fontSize: 16,
              fontWeight: "bold",
              flex: 1,
            }}
          >
            {nameRestaurant}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowRadius: 1,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  imageAvatarUser: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  reviewTitle: {
    marginBottom: 10,
    borderTopColor: "#eee",
    borderTopWidth: 1,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingVertical: 12,
  },
  reviewDate: {
    color: "grey",
    fontSize: 12,
  },
  reviewName: {
    fontWeight: "bold",
    marginBottom: 3,
  },
});

export default ListItemReview;
