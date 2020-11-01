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
import colors from "../../constants/Colors";

const screenWidth = Dimensions.get("screen").width;

const ReviewScreen = (props) => {
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
    <ScrollView style={styles.container}>
      <View style={styles.reviewHead}>
        <View style={styles.userAvatarWrap}>
          <Avatar
            size="large"
            rounded
            containerStyle={styles.userAvatar}
            source={
              avatarUser
                ? { uri: avatarUser }
                : require("../../../assets/img/avatar-default.jpg")
            }
          />
        </View>
        <Text style={styles.userName}>{nameUser}</Text>
      </View>
      <View style={styles.rating}>
        <Rating
          type="custom"
          ratingColor={colors.primary}
          imageSize={15}
          startingValue={rating}
          readonly
        />
        <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("restaurant", { restaurant: restaurant })
        }
      >
        <View style={styles.restaurantButton}>
          <Text style={styles.restaurantName}>{nameRestaurant}</Text>
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
    <Image
      PlaceholderContent={<ActivityIndicator color="#fff" />}
      style={styles.reviewImage}
      source={{ uri: imageUrl }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
  },
  reviewHead: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  userAvatarWrap: {
    marginRight: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 17,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingNumber: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  restaurantButton: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background,
  },
  restaurantName: {
    marginRight: 10,
    flex: 1,
  },
  reviewDate: {
    marginBottom: 15,
    color: "grey",
    fontSize: 12,
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
  reviewImage: {
    width: screenWidth / 2.1,
    height: 150,
    margin: 1,
  },
});

export default ReviewScreen;
