import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Platform,
  Dimensions,
} from "react-native";
import { SearchBar, Icon, Button } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "firebase";

import { getSearchRestaurantsApi } from "../../api/restaurants";
import ModalAddReview from "../../components/Restaurants/ModalAddReview";
import colors from "../../constants/Colors";
import ModalLogin from "../../components/Account/ModalLogin";

const screenHeight = Dimensions.get("screen").height;

const PostReviewScreen = (props) => {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState(null);
  const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [isNoSearchResults, setIsNoSearchResults] = useState(false);
  const [login, setLogin] = useState(null);
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(false);
  const [errors, setErrors] = useState({
    rating: false,
    title: "",
    review: "",
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setLogin(true) : setLogin(false);
    });
  }, []);

  useEffect(() => {
    setIsNoSearchResults(false);
    if (search.length !== 0) {
      getSearchRestaurantsApi(search, 1, 100).then((response) => {
        const totalPages = response.total_hit_count;

        if (totalPages) {
          setRestaurants(response.rest);
        } else {
          setRestaurants(null);
          setIsNoSearchResults(true);
        }
      });
    } else {
      setRestaurants(null);
    }
  }, [search]);

  return login ? (
    <>
      <View style={styles.container}>
        <SearchBar
          placeholder="店名・キーワード"
          onChangeText={(e) => setSearch(e)}
          value={search}
          platform="ios"
          cancelButtonTitle="キャンセル"
          cancelButtonProps={{ color: colors.primary }}
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.input}
        />
        {restaurants && search.length !== 0 && (
          <Text style={styles.title}>候補のお店</Text>
        )}
        {restaurants && (
          <KeyboardAwareScrollView enableResetScrollToCoords={false}>
            {restaurants && search.length !== 0 && (
              <FlatList
                data={restaurants}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setRestaurant(item);
                      Platform.OS === "ios"
                        ? setIsModalReviewOpen(true)
                        : navigation.navigate("add-review", {
                            restaurant: item,
                          });
                      setErrors({
                        rating: false,
                        title: "",
                        review: "",
                      });
                    }}
                  >
                    <View style={styles.restaurant}>
                      <View style={styles.restaurantContent}>
                        <Text style={styles.restaurantName}>{item.name}</Text>
                        <Text
                          style={styles.area}
                        >{`${item.code.prefname} ${item.code.areaname_s}`}</Text>
                      </View>
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigation.navigate("restaurant", {
                            restaurant: item,
                          })
                        }
                      >
                        <View style={styles.infoButton}>
                          <Text style={styles.infoButtonText}>
                            店舗情報を見る
                          </Text>
                          <Icon
                            name="chevron-right"
                            type="entypo"
                            color="#555"
                            size={16}
                          />
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </TouchableWithoutFeedback>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </KeyboardAwareScrollView>
        )}
        {isNoSearchResults && (
          <View style={styles.notResultsText}>
            <Text>お店が見つかりません。</Text>
          </View>
        )}
      </View>
      {restaurant && (
        <ModalAddReview
          setIsModalReviewOpen={setIsModalReviewOpen}
          isModalReviewOpen={isModalReviewOpen}
          restaurant={restaurant}
          errors={errors}
          setErrors={setErrors}
        />
      )}
    </>
  ) : (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>投稿したい場合はログインしてください</Text>
      <Button
        title="ログインする"
        buttonStyle={styles.loginButton}
        onPress={() => {
          Platform.OS === "ios"
            ? setIsModalLoginOpen(true)
            : navigation.navigate("page-login", { type: "post" });
          setLoginErrors({ email: "", password: "" });
          setLoginError(false);
        }}
        containerStyle={{ width: "70%" }}
      />
      <ModalLogin
        setIsModalOpen={setIsModalLoginOpen}
        isModalOpen={isModalLoginOpen}
        type="post"
        errors={loginErrors}
        setErrors={setLoginErrors}
        loginError={loginError}
        setLoginError={setLoginError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
  },
  title: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  restaurant: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    padding: 10,
  },
  restaurantContent: {
    flex: 1,
    paddingRight: 10,
  },
  restaurantName: {
    fontSize: 16,
    lineHeight: 17,
    marginBottom: 3,
  },
  area: {
    fontSize: 13,
    color: "#777",
  },
  infoButton: {
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  infoButtonText: {
    fontSize: 11,
    marginRight: 2,
  },
  notResultsText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: screenHeight / 2 - 120,
  },
  loginText: {
    marginBottom: 25,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
  },
});

export default PostReviewScreen;
