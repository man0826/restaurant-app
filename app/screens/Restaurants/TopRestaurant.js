import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Rating, ListItem, Icon, Image, Button } from "react-native-elements";
import { map } from "lodash";
import Toast from "react-native-easy-toast";

import ListItemReview from "../../components/Restaurants/ListItemReview";
import Carousel from "../../components/Carousel";
import colors from "../../utils/colors";

const screenWidth = Dimensions.get("window").width;

const TopRestaurant = (props) => {
  const {
    restaurant,
    navigation,
    jumpTo,
    reviews,
    isModalMapOpen,
    setIsModalMapOpen,
  } = props;
  const { image_url, latitude, longitude } = restaurant;
  const [rating, setRating] = useState(0);
  const [showList, setShowList] = useState(false);
  const toastRef = useRef();

  return (
    <View vertical style={styles.viewBody}>
      {image_url.shop_image1 && image_url.shop_image2 ? (
        <Carousel
          arrayImageUrl={[image_url.shop_image1, image_url.shop_image2]}
          slideWidth={screenWidth}
          itemWidth={screenWidth}
          height={250}
        />
      ) : image_url.shop_image1 ? (
        <Image
          PlaceholderContent={<ActivityIndicator color="#fff" />}
          style={{ width: screenWidth, height: 250 }}
          source={{ uri: image_url.shop_image1 }}
        />
      ) : (
        <Image
          PlaceholderContent={<ActivityIndicator color="#fff" />}
          style={{ width: screenWidth, height: 250 }}
          source={require("../../../assets/img/no-image.png")}
        />
      )}
      <TitleRestaurant
        restaurant={restaurant}
        rating={rating}
        reviews={reviews}
        setRating={setRating}
        location={{
          latitude: latitude,
          longitude: longitude,
        }}
        isModalMapOpen={isModalMapOpen}
        setIsModalMapOpen={setIsModalMapOpen}
      />
      <RestaurantInfo restaurant={restaurant} />
      {restaurant.budget.length === 0 &&
      restaurant.credit_card.length === 0 &&
      restaurant.pr.pr_long.length === 0 ? null : !showList ? (
        <TouchableWithoutFeedback onPress={() => setShowList(true)}>
          <View
            style={{
              padding: 15,
              backgroundColor: "#fff",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "gray" }}>
              もっとみる
            </Text>
            <Icon
              type="ionicon"
              name="ios-arrow-down"
              color="gray"
              size={15}
              iconStyle={{ marginLeft: 7 }}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View>
          <RestaurantInfoHide restaurant={restaurant} />
          <TouchableWithoutFeedback onPress={() => setShowList(false)}>
            <View
              style={{
                padding: 15,
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", color: "gray" }}>閉じる</Text>
              <Icon
                type="ionicon"
                name="ios-arrow-up"
                color="gray"
                size={15}
                iconStyle={{ marginLeft: 7 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
      <View style={styles.viewReviews}>
        <View style={styles.reviewsTitle}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 20 }}>
            みんなの投稿
          </Text>
        </View>
        {reviews.length === 0 ? (
          <Text style={{ padding: 20 }}>投稿はありません。</Text>
        ) : (
          <View>
            {map(reviews, (review, index) => {
              if (index >= 3) return;
              return (
                <ListItemReview
                  key={index}
                  review={review}
                  navigation={navigation}
                />
              );
            })}
            <Button
              type="clear"
              title={`投稿をもっと見る(${reviews.length})`}
              onPress={() => jumpTo("second")}
              buttonStyle={styles.btnAddReview}
              titleStyle={styles.btnTitleAddReview}
              icon={
                <Icon
                  name="chevron-right"
                  type="entypo"
                  color="#aaa"
                  size={20}
                />
              }
              iconRight
            />
          </View>
        )}
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
};

const TitleRestaurant = (props) => {
  const {
    restaurant,
    rating,
    setRating,
    reviews,
    isModalMapOpen,
    setIsModalMapOpen,
  } = props;
  const { name, code, access } = restaurant;

  let totalRating = 0;
  let count = 0;

  map(reviews, (review) => {
    totalRating += review.rating;
    count++;
  });

  setRating(reviews.length !== 0 ? (totalRating / count).toFixed(2) : 0);

  return (
    <View style={styles.viewRestaurantTitle}>
      <Text style={styles.restaurantName}>{name}</Text>
      {reviews.length !== 0 ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Rating
            type="custom"
            ratingColor={colors.primary}
            imageSize={16}
            readonly
            startingValue={parseFloat(rating)}
          />
          <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 18 }}>
            {rating}
          </Text>
          <Icon
            type="material-community"
            name="comment"
            color="#999"
            size={20}
            containerStyle={{ marginLeft: 15 }}
          />
          <Text style={{ marginLeft: 4 }}>{reviews.length}件</Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              color: "#ccc",
              marginLeft: 10,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            - - - - -
          </Text>
          <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 18 }}>
            -
          </Text>
          <Icon
            type="material-community"
            name="comment"
            color="#999"
            size={20}
            containerStyle={{ marginLeft: 15 }}
          />
          <Text style={{ marginLeft: 4 }}>-件</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1, marginRight: 5 }}>
          <Text style={{ color: "gray", fontSize: 13 }}>
            {code.category_name_l.join("　")}
          </Text>
          {access.walk.length !== 0 && (
            <Text
              style={{ color: "gray", marginTop: 5, fontSize: 13 }}
            >{`${access.line}${access.station}${access.station_exit} ${access.walk}分`}</Text>
          )}
        </View>
        <TouchableOpacity onPress={() => setIsModalMapOpen(!isModalMapOpen)}>
          <Image
            style={{
              width: 70,
              height: 45,
              borderWidth: 1,
              borderColor: "#aaa",
              borderRadius: 5,
            }}
            source={require("../../../assets/img/map_image.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

function RestaurantInfo(props) {
  const { restaurant } = props;
  const { address, tel, opentime, holiday } = restaurant;

  const listInfo = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null,
    },
    {
      text: tel,
      iconName: "phone",
      iconType: "material-community",
      action: null,
    },
    {
      text: opentime,
      iconName: "md-time",
      iconType: "ionicon",
      action: null,
    },
    {
      text: holiday ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: -18,
          }}
        >
          <Image
            style={{ width: 23, height: 23 }}
            source={require("../../../assets/img/holiday2.png")}
          />
          <Text style={{ marginLeft: 17, flex: 1 }}>{holiday}</Text>
        </View>
      ) : null,
      action: null,
    },
  ];

  return (
    <View style={styles.viewRestaurantInfo}>
      {map(listInfo, (item, index) => {
        if (!item.text) return;
        return (
          <ListItem
            key={index}
            title={item.text}
            titleStyle={{ fontSize: 14 }}
            leftIcon={{
              name: item.iconName,
              type: item.iconType,
              color: "#555",
            }}
            containerStyle={styles.containerListItem}
          />
        );
      })}
    </View>
  );
}

function RestaurantInfoHide(props) {
  const { restaurant } = props;
  const { budget, credit_card, pr } = restaurant;

  const listInfo = [
    {
      text: budget ? `${budget}円 (平均予算)` : null,
      iconName: "yen-sign",
      iconType: "font-awesome-5",
      action: null,
    },
    {
      text: credit_card,
      iconName: "md-card",
      iconType: "ionicon",
      action: null,
    },
    {
      text: pr.pr_long ? (
        <View style={{ marginLeft: -18 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 5, fontSize: 15 }}>
            店舗情報
          </Text>
          <Text style={{ lineHeight: 16 }}>{pr.pr_long}</Text>
        </View>
      ) : null,
      action: null,
    },
  ];

  return (
    <View style={styles.viewRestaurantInfo}>
      {map(listInfo, (item, index) => {
        if (!item.text) return;
        return (
          <ListItem
            key={index}
            title={item.text}
            titleStyle={{ fontSize: 14 }}
            leftIcon={{
              name: item.iconName,
              type: item.iconType,
              color: "#555",
            }}
            containerStyle={styles.containerListItem}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#eee",
  },
  viewRestaurantTitle: {
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 15,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "grey",
  },
  viewRestaurantInfo: {
    backgroundColor: "#fff",
  },
  restaurantInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  viewReviews: {
    paddingTop: 15,
    marginBottom: 90,
    backgroundColor: "#fff",
  },
  reviewsTitle: {
    paddingBottom: 15,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  btnAddReview: {
    paddingVertical: 20,
  },
  btnTitleAddReview: {
    fontSize: 17,
    color: "#777",
    marginRight: 15,
    marginTop: -5,
  },
});

export default TopRestaurant;
