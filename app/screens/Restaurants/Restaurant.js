import React, { useState, useEffect, useRef } from "react";
import { Dimensions, ScrollView, Animated, View } from "react-native";
import firebase from "firebase";
import { TabView, TabBar } from "react-native-tab-view";
import Toast from "react-native-easy-toast";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-native-elements";

import ModalAddReview from "../../components/Restaurants/ModalAddReview";
import ModalMap from "../../components/Restaurants/ModalMap";
import Reviews from "../../components/Restaurants/Reviews";
import TopRestaurant from "./TopRestaurant";
import FooterRestaurant from "../../components/Restaurants/FooterRestaurant";
import { addClip, deleteClip } from "../../store/actions/user";
import colors from "../../utils/colors";

console.disableYellowBox = true;

const db = firebase.firestore();
const screenWidth = Dimensions.get("window").width;

const Restaurant = (props) => {
  const { navigation, route } = props;
  const { restaurant } = route.params;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "トップ" },
    { key: "second", title: "口コミ" },
  ]);
  const [reviews, setReviews] = useState([]);
  const [userLogged, setUserLogged] = useState(false);
  const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);
  const [isModalMapOpen, setIsModalMapOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [errors, setErrors] = useState({
    rating: false,
    title: "",
    review: "",
  });

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 90);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 90],
    outputRange: [0, 180],
  });
  const toastRef = useRef();
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

  navigation.setOptions({
    title: restaurant.name,
    headerStyle: { backgroundColor: colors.primary, shadowOpacity: 0 },
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
    headerRight: () => (
      <View
        style={{
          borderWidth: 1,
          borderColor: isClipped() ? "#EF707B" : "#000",
          borderRadius: 100,
          width: 35,
          height: 35,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
          backgroundColor: isClipped()
            ? "rgba(255,255,255,.5)"
            : colors.primary,
        }}
      >
        <Icon
          type="material-community"
          name={isClipped() ? "heart" : "heart-outline"}
          onPress={toggleClip}
          color={isClipped() ? "#EF707B" : "#000"}
          size={22}
          underlayColor="transparent"
        />
      </View>
    ),
  });

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useEffect(() => {
    setReload(false);
    const reviewsAry = [];
    db.collection("reviews")
      .where("idRestaurant", "==", restaurant.id)
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
  }, [reload]);

  const renderTabBar = (props) => (
    <TabBar
      onTabPress={({ route, preventDefault }) => {
        if (reviews.length === 0 && route.key === "second") {
          preventDefault();
        }
      }}
      {...props}
      indicatorStyle={{
        backgroundColor: "#0074e8",
        height: 3,
      }}
      style={{
        backgroundColor: colors.primary,
        shadowColor: "#000",
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
      }}
      inactiveColor="#000"
      activeColor="#000"
      labelStyle={{ fontWeight: "bold" }}
    />
  );

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "first":
        return (
          <ScrollView
            onScroll={(e) => {
              if (e.nativeEvent.contentOffset.y < 0) return;
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            scrollEventThrottle={1}
          >
            <TopRestaurant
              navigation={navigation}
              restaurant={restaurant}
              reviews={reviews}
              isModalMapOpen={isModalMapOpen}
              setIsModalMapOpen={setIsModalMapOpen}
              jumpTo={jumpTo}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
          </ScrollView>
        );
      case "second":
        return (
          <ScrollView
            onScroll={(e) => {
              if (e.nativeEvent.contentOffset.y < 0) return;
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            scrollEventThrottle={1}
          >
            <Reviews reviews={reviews} navigation={navigation} />
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={screenWidth}
        swipeEnabled={!!reviews.length}
      />
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          elevation: 4,
          zIndex: 100,
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <FooterRestaurant
          userLogged={userLogged}
          setIsModalReviewOpen={setIsModalReviewOpen}
          isModalReviewOpen={isModalReviewOpen}
          setErrors={setErrors}
          navigation={navigation}
          restaurant={restaurant}
          setReload={setReload}
        />
      </Animated.View>
      <ModalAddReview
        setIsModalReviewOpen={setIsModalReviewOpen}
        isModalReviewOpen={isModalReviewOpen}
        restaurant={restaurant}
        setReload={setReload}
        errors={errors}
        setErrors={setErrors}
      />
      <ModalMap
        setIsModalMapOpen={setIsModalMapOpen}
        isModalMapOpen={isModalMapOpen}
        restaurant={restaurant}
      />
    </>
  );
};

export default Restaurant;
