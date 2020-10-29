import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";

import ListItemReview from "../components/Restaurants/ListItemReview";

const db = firebase.firestore();

const PostReview = (props) => {
  const { navigation } = props;
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [totalReview, setTotalReview] = useState(null);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    db.collection("reviews")
      .get()
      .then((response) => {
        setTotalReview(response.size);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const reviewsAry = [];
      db.collection("reviews")
        .orderBy("createAt", "desc")
        .limit(showReviews)
        .get()
        .then((docs) => {
          return docs.forEach((doc) => {
            reviewsAry.push(doc.data());
          });
        })
        .then(() => {
          setReviews(reviewsAry);
          if (showReviews <= totalReview) {
            setIsLoading(true);
          } else {
            setIsLoading(false);
          }
          setSpinner(false);
        })
        .catch(() => {
          console.log("error");
        });
    }, [showReviews, totalReview])
  );

  const onMoreHandler = () => {
    if (showReviews <= totalReview) {
      setShowReviews(showReviews + 10);
    }
    return;
  };

  return reviews ? (
    <>
      <FlatList
        style={{ backgroundColor: "#eee" }}
        data={reviews}
        renderItem={({ item }) => (
          <ListItemReview
            review={item}
            navigation={navigation}
            showRestaurantName={true}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={onMoreHandler}
        ListFooterComponent={<FooterList isLoading={isLoading} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <Spinner
        visible={spinner}
        overlayColor="rgba(0,0,0,0.5)"
        animation="fade"
      />
    </>
  ) : (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>投稿はありません</Text>
      </View>
      <Spinner
        visible={spinner}
        overlayColor="rgba(0,0,0,0.5)"
        animation="fade"
      />
    </>
  );
};

const FooterList = (props) => {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={{ paddingVertical: 15 }}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return null;
  }
};

export default PostReview;
