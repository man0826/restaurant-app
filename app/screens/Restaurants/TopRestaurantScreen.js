import React, { useState } from "react";
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

import ListItemReview from "../../components/Restaurants/ListItemReview";
import Carousel from "../../components/Carousel";
import colors from "../../constants/Colors";

const screenWidth = Dimensions.get("screen").width;

const TopRestaurantScreen = (props) => {
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

  return (
    <View style={styles.container}>
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
          style={styles.topImage}
          source={{ uri: image_url.shop_image1 }}
        />
      ) : (
        <Image
          PlaceholderContent={<ActivityIndicator color="#fff" />}
          style={styles.topImage}
          source={require("../../../assets/img/no-image.png")}
        />
      )}
      <HeadRestaurant
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
      <ListInfoRestaurant restaurant={restaurant} />
      {restaurant.budget.length === 0 &&
      restaurant.credit_card.length === 0 &&
      restaurant.pr.pr_long.length === 0 ? null : !showList ? (
        <TouchableWithoutFeedback onPress={() => setShowList(true)}>
          <View style={styles.toggleList}>
            <Text style={styles.toggleListText}>もっとみる</Text>
            <Icon type="ionicon" name="ios-arrow-down" color="gray" size={15} />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View>
          <ListInfoRestaurantHide restaurant={restaurant} />
          <TouchableWithoutFeedback onPress={() => setShowList(false)}>
            <View style={styles.toggleList}>
              <Text style={styles.toggleListText}>閉じる</Text>
              <Icon type="ionicon" name="ios-arrow-up" color="gray" size={15} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
      <View style={styles.reviews}>
        <View style={styles.reviewsTitleContainer}>
          <Text style={styles.reviewsTitle}>みんなの投稿</Text>
        </View>
        {reviews.length === 0 ? (
          <Text style={styles.notPostText}>投稿はありません。</Text>
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
              buttonStyle={styles.moreReviewsButton}
              titleStyle={styles.moreReviewsButtonText}
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
    </View>
  );
};

const HeadRestaurant = (props) => {
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
    <View style={styles.headRestaurant}>
      <Text style={styles.restaurantName}>{name}</Text>
      {reviews.length !== 0 ? (
        <View style={styles.ratingWrap}>
          <Rating
            type="custom"
            ratingColor={colors.primary}
            imageSize={16}
            readonly
            startingValue={parseFloat(rating)}
          />
          <Text style={styles.ratingNumber}>{rating}</Text>
          <Icon
            type="material-community"
            name="comment"
            color="#999"
            size={20}
            containerStyle={styles.commentIcon}
          />
          <Text>{reviews.length}件</Text>
        </View>
      ) : (
        <View style={styles.ratingWrap}>
          <Text style={[styles.notReviewText, { color: "#ccc" }]}>
            - - - - -
          </Text>
          <Text style={styles.notReviewText}>-</Text>
          <Icon
            type="material-community"
            name="comment"
            color="#999"
            size={20}
            containerStyle={styles.commentIcon}
          />
          <Text>-件</Text>
        </View>
      )}
      <View style={styles.access}>
        <View style={styles.accessContent}>
          <Text style={styles.accessText}>
            {code.category_name_l.join("　")}
          </Text>
          {access.walk.length !== 0 && (
            <Text
              style={[styles.accessText, { marginTop: 5 }]}
            >{`${access.line}${access.station}${access.station_exit} ${access.walk}分`}</Text>
          )}
        </View>
        <TouchableOpacity onPress={() => setIsModalMapOpen(!isModalMapOpen)}>
          <Image
            style={styles.accessMap}
            source={require("../../../assets/img/map_image.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ListInfoRestaurant = (props) => {
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
        <View style={styles.holiday}>
          <Image
            style={styles.iconHoliday}
            source={require("../../../assets/img/holiday.png")}
          />
          <Text style={styles.textHoliday}>{holiday}</Text>
        </View>
      ) : null,
      action: null,
    },
  ];

  return (
    <View style={styles.listInfoRestaurant}>
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
};

const ListInfoRestaurantHide = (props) => {
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
        <View style={styles.prLong}>
          <Text style={styles.listInfoTitle}>店舗情報</Text>
          <Text style={styles.prLongText}>{pr.pr_long}</Text>
        </View>
      ) : null,
      action: null,
    },
  ];

  return (
    <View style={styles.listInfoRestaurant}>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topImage: {
    width: screenWidth,
    height: 250,
  },
  toggleList: {
    paddingVertical: 15,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  toggleListText: {
    fontWeight: "bold",
    color: "gray",
    marginRight: 10,
  },
  notPostText: {
    padding: 20,
  },
  reviews: {
    marginBottom: 90,
    backgroundColor: colors.background,
  },
  reviewsTitleContainer: {
    paddingVertical: 15,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
  },
  moreReviewsButton: {
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  moreReviewsButtonText: {
    fontSize: 17,
    color: "#777",
    marginRight: 15,
    marginTop: -5,
    fontWeight: "bold",
  },
  headRestaurant: {
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 15,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listInfoRestaurant: {
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
  ratingWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingNumber: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  commentIcon: {
    marginLeft: 15,
    marginRight: 4,
  },
  notReviewText: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  access: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  accessContent: {
    flex: 1,
    marginRight: 5,
  },
  accessText: {
    color: "gray",
    fontSize: 13,
  },
  accessMap: {
    width: 70,
    height: 45,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
  },
  holiday: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -18,
  },
  iconHoliday: {
    width: 23,
    height: 23,
  },
  textHoliday: {
    marginLeft: 17,
    flex: 1,
  },
  prLong: {
    marginLeft: -18,
  },
  prLongText: {
    lineHeight: 16,
  },
  listInfoTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 15,
  },
});

export default TopRestaurantScreen;
