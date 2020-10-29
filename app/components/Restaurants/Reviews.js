import React from "react";
import { FlatList } from "react-native";

import ListItemReview from "./ListItemReview";

const Reviews = (props) => {
  const { reviews, navigation } = props;

  return (
    <FlatList
      style={{ marginBottom: 90, backgroundColor: "#fff" }}
      data={reviews}
      renderItem={({ item }) => (
        <ListItemReview review={item} navigation={navigation} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Reviews;
