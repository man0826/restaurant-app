import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import firebase from "firebase";

import ListItemReview from "../../components/Restaurants/ListItemReview";

const db = firebase.firestore();

const MyReviewsScreen = (props) => {
  const { navigation } = props;
  const [idUser, setIdUser] = useState(null);
  const [reviews, setReviews] = useState(null);

  navigation.setOptions({
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
    const user = firebase.auth().currentUser;
    setIdUser(user.uid);
  }, []);
  useFocusEffect(
    useCallback(() => {
      if (idUser) {
        const reviewsAry = [];
        db.collection("reviews")
          .where("idUser", "==", idUser)
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              reviewsAry.push(doc.data());
            });
          })
          .then(() => {
            reviewsAry.sort((a, b) => {
              return b.createAt.seconds - a.createAt.seconds;
            });
            setReviews(reviewsAry);
          });
      }
    }, [idUser])
  );

  if (!reviews) {
    return null;
  }

  return reviews.length !== 0 ? (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ListItemReview
          review={item}
          navigation={navigation}
          showRestaurantName={true}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  ) : (
    <View style={styles.notPostsText}>
      <Text>投稿はありません。</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notPostsText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyReviewsScreen;
