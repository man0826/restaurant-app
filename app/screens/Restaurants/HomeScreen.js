import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import { Image, Icon, Button } from "react-native-elements";
import { map } from "lodash";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import {
  getCategoriesApi,
  getLocationRestaurantsApi,
  getAreaSearchApi,
  getPrefSearchApi,
  getAreaLargeSearchApi,
} from "../../api/restaurants";
import { getCategoryImagesPath } from "../../utils/getCategoryImagesPath";
import { getConditionsImagesPath } from "../../utils/getConditionsImagesPath";
import { getLocation } from "../../utils/getLocation";
import ListItemReview from "../../components/Restaurants/ListItemReview";
import { addClip, deleteClip } from "../../store/actions/user";
import colors from "../../constants/Colors";

const db = firebase.firestore();
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const HomeScreen = (props) => {
  const { navigation } = props;
  const [categories, setCategories] = useState(null);
  const [nearRestaurants, setNearRestaurants] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [area, setArea] = useState(null);
  const [pref, setPref] = useState(null);
  const [areaLarge, setAreaLarge] = useState(null);

  const conditions = [
    { name: "食べ放題", type: "buffet" },
    { name: "飲み放題", type: "bottomless_cup" },
    { name: "ランチ営業あり", type: "lunch" },
    { name: "個室あり", type: "private_room" },
    { name: "深夜営業あり", type: "midnight" },
    { name: "駐車場あり", type: "parking" },
    { name: "キッズメニューあり", type: "kids_menu" },
    { name: "スポーツ観戦可", type: "sports" },
    { name: "デリバリーあり", type: "deliverly" },
    { name: "モーニング・朝ごはんあり", type: "breakfast" },
    { name: "ペット同伴可", type: "with_pet" },
    { name: "朝まで営業あり", type: "until_morning" },
    { name: "テイクアウトあり", type: "takeout" },
    { name: "日曜営業あり", type: "sunday_open" },
    { name: "カード利用可", type: "card" },
    { name: "禁煙席あり", type: "no_smoking" },
    { name: "wifiあり", type: "wifi" },
    { name: "お弁当あり", type: "bento" },
  ];

  useEffect(() => {
    getAreaLargeSearchApi().then((response) => {
      setAreaLarge(response.garea_large);
    });
  }, []);

  useEffect(() => {
    getAreaSearchApi().then((response) => {
      setArea(response.area);
    });
  }, []);

  useEffect(() => {
    getPrefSearchApi().then((response) => {
      setPref(response.pref);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const reviewsAry = [];
      db.collection("reviews")
        .orderBy("createAt", "desc")
        .limit(5)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            reviewsAry.push(doc.data());
          });
        })
        .then(() => {
          setReviews(reviewsAry);
        });
    }, [])
  );

  useEffect(() => {
    getLocation().then((location) => {
      getLocationRestaurantsApi(location).then((response) => {
        setNearRestaurants(response.rest);
      });
    });
  }, []);

  useEffect(() => {
    getCategoriesApi().then((response) => {
      setCategories(response.category_l);
    });
  }, []);
  /*
  useEffect(() => {
    const location = {
      latitude: 31.5633896,
      longitude: 130.5522253,
    };
    getLocationRestaurantsApi(location).then((response) => {
      setTestRestaurants(response.rest);
    });
  }, []);
  */

  return (
    <>
      <ParallaxScrollView
        backgroundColor={colors.primary}
        parallaxHeaderHeight={screenHeight / 3}
        /*stickyHeaderHeight={Platform.OS === "ios" ? 115 : 85}
        renderStickyHeader={() => (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("search-restaurants")}
          >
            <View
              style={{
                backgroundColor: "#fff",
                height: Platform.OS === "ios" ? 115 : 85,
              }}
            >
              <View
                style={{
                  paddingTop: Platform.OS === "ios" ? 50 : 30,
                  backgroundColor: colors.primary,
                  alignItems: "center",
                  height: 110,
                  shadowColor: "#000",
                  shadowRadius: 3,
                  shadowOpacity: 0.3,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 2,
                }}
              >
                <Image
                  style={{ width: 300, height: 43 }}
                  source={require("../../../assets/img/search.png")}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}*/
        renderBackground={() => (
          <Image
            source={require("../../../assets/img/top.jpg")}
            resizeMode="cover"
            style={styles.parallaxImage}
          ></Image>
        )}
        outputScaleValue={2}
        renderForeground={() => (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("search-restaurants")}
          >
            <View style={styles.searchBarWrap}>
              <View style={styles.searchBar}>
                <Icon
                  type="font-awesome"
                  name="search"
                  size={18}
                  color="#fff"
                />
                <Text style={styles.placeholder}>店名・キーワードで探す</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      >
        <View style={styles.container}>
          <View style={styles.topButtonArea}>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("list-category", {
                  categories: area,
                  pref,
                  areaLarge,
                  type: "area",
                })
              }
            >
              <View style={styles.topButton}>
                <Icon type="evilicon" name="location" color="#999" size={25} />
                <Text style={styles.topButtonText}>エリアから探す</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("search-map")}
            >
              <View style={styles.topButton}>
                <Icon
                  type="material-community"
                  name="google-maps"
                  color="#999"
                  size={22}
                />
                <Text style={[styles.topButtonText, { marginLeft: 5 }]}>
                  現在地からMAPで探す
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Categories
            categories={categories}
            type="categories"
            title="ジャンル"
            navigation={navigation}
          />
          <Categories
            categories={conditions}
            type="conditions"
            title="条件"
            navigation={navigation}
          />
          <ListRestaurants
            restaurants={nearRestaurants}
            navigation={navigation}
            title="今いる場所から近いお店"
          />
          {reviews && (
            <View>
              <View style={styles.postListTitleContainer}>
                <Text style={styles.postListTitle}>最新の投稿</Text>
              </View>
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
              {reviews.length !== 0 ? (
                <Button
                  type="clear"
                  title="もっと見る"
                  onPress={() => navigation.navigate("timeline")}
                  containerStyle={styles.moreButton}
                  titleStyle={styles.moreButtonText}
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
              ) : (
                <View style={notPostText}>
                  <Text>投稿はありません</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ParallaxScrollView>
    </>
  );
};

const Categories = (props) => {
  const { categories, type, title, navigation } = props;

  return (
    <View style={styles.categoryList}>
      <View style={styles.categoryHead}>
        <Text style={styles.categoryTitle}>{title}から探す</Text>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("list-category", { categories, type })
          }
        >
          <View style={styles.categoryAll}>
            <Text style={styles.categoryAllText}>{title}一覧</Text>
            <Icon type="entypo" name="chevron-right" size={15} color="#555" />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {map(categories, (category, index) => {
          let name, imagePath;

          switch (type) {
            case "categories":
              name = category.category_l_name;
              imagePath = getCategoryImagesPath(
                category.category_l_code,
                "image"
              );
              break;
            case "conditions":
              name = category.name;
              imagePath = getConditionsImagesPath(category.type);
              break;
            default:
              console.log("not type");
          }

          if (index >= 6) return;
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() =>
                navigation.navigate("list-restaurants", { category, type })
              }
            >
              <View style={styles.categoryItem}>
                <Image
                  PlaceholderContent={<ActivityIndicator color="#fff" />}
                  style={styles.categoryImage}
                  source={imagePath}
                />
                <LinearGradient
                  colors={["rgba(0,0,0,0)", "#000"]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradient}
                >
                  <Text style={styles.categoryName}>{name}</Text>
                </LinearGradient>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

const ListRestaurants = (props) => {
  const { restaurants, navigation, title } = props;

  return (
    <View style={styles.restaurantsList}>
      <Text style={styles.restaurantTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {map(restaurants, (restaurant, index) => (
          <Restaurant
            restaurant={restaurant}
            navigation={navigation}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const Restaurant = (props) => {
  const { restaurant, navigation } = props;
  const { image_url, name, budget, code } = restaurant;
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
      <View style={styles.cardWrap}>
        <View style={styles.card}>
          <Image
            PlaceholderContent={<ActivityIndicator color="#fff" />}
            style={styles.cardImage}
            source={
              image_url.shop_image1
                ? { uri: image_url.shop_image1 }
                : require("../../../assets/img/no-image.png")
            }
            resizeMode="cover"
          />
          <Text style={styles.restaurantName} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.restaurantCategory} numberOfLines={1}>
            {code.category_name_l.join("　")}
          </Text>
          <View style={styles.price}>
            <Icon
              type="font-awesome"
              name="yen"
              size={13}
              containerStyle={styles.priceIcon}
              color="#fff"
            />
            <Text>{budget ? budget + "円 (平均予算)" : "--"}</Text>
          </View>
          <TouchableWithoutFeedback onPress={toggleClip}>
            <View
              style={[
                styles.favorites,
                { backgroundColor: isClipped() ? "#FFDADA" : "#fff" },
              ]}
            >
              <Icon
                type="material-community"
                name={isClipped() ? "heart" : "heart-outline"}
                color={isClipped() ? "#EF707B" : "#555"}
                size={22}
                underlayColor="transparent"
              />
              <Text
                style={[
                  styles.favoritesText,
                  { color: isClipped() ? "#EF707B" : "#555" },
                ]}
              >
                お気に入り
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  parallaxImage: {
    width: "100%",
    height: "100%",
  },
  searchBarWrap: {
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: "rgba(255,255,255,.1)",
    borderColor: "#fff",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 45,
    borderRadius: 30,
    marginTop: screenHeight / 4,
  },
  placeholder: {
    fontSize: 16,
    marginLeft: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    backgroundColor: colors.background,
  },
  topButtonArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 40,
  },
  topButton: {
    width: screenWidth / 2 - 20,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "#fff",
  },
  topButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  postListTitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
  },
  postListTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  moreButton: {
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  moreButtonText: {
    color: "#777",
    marginRight: 15,
    fontSize: 17,
    fontWeight: "bold",
  },
  notPostText: {
    padding: 15,
  },
  categoryList: {
    marginBottom: 30,
  },
  categoryHead: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryAll: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryAllText: {
    marginRight: 2,
    fontWeight: "bold",
  },
  categoryItem: {
    marginLeft: 10,
    width: 170,
    height: 120,
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  categoryName: {
    color: "#fff",
    marginTop: 45,
    marginHorizontal: 2,
    fontSize: 14,
    fontWeight: "bold",
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  restaurantsList: {
    marginBottom: 20,
  },
  restaurantTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  cardWrap: {
    width: 280,
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 15,
    marginLeft: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    paddingBottom: 15,
  },
  cardImage: {
    width: "100%",
    height: 190,
    marginBottom: 10,
    borderRadius: 5,
  },
  gradient: {
    width: "100%",
    height: 70,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
  },
  restaurantCategory: {
    marginBottom: 5,
    color: "#777",
    fontSize: 13,
  },
  restaurantName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  priceIcon: {
    backgroundColor: "#333",
    width: 14,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginRight: 4,
  },
  favorites: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    borderRadius: 5,
  },
  favoritesText: {
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default HomeScreen;
