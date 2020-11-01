import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { getSearchRestaurantsApi } from "../../api/restaurants";
import colors from "../../constants/Colors";

const SearchRestaurantsScreen = (props) => {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState(null);
  const [isNotSearchResults, setIsNotSearchResults] = useState(false);

  useEffect(() => {
    setIsNotSearchResults(false);
    if (search.length !== 0) {
      getSearchRestaurantsApi(search, 1, 100).then((response) => {
        const totalPages = response.total_hit_count;

        if (totalPages) {
          setRestaurants(response.rest);
        } else {
          setRestaurants(null);
          setIsNotSearchResults(true);
        }
      });
    } else {
      setRestaurants(null);
    }
  }, [search]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          type="entypo"
          name="chevron-left"
          size={35}
          color="#000"
          containerStyle={{ marginLeft: 5 }}
          onPress={() => navigation.goBack()}
        />
        <SearchBar
          placeholder="店名・キーワード"
          onChangeText={(e) => setSearch(e)}
          value={search}
          platform="ios"
          cancelButtonTitle="キャンセル"
          cancelButtonProps={{ color: "#fff" }}
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.input}
          onSubmitEditing={() =>
            navigation.navigate("search-list-restaurants", { search })
          }
        />
      </View>
      {restaurants && search.length !== 0 && (
        <Text style={styles.resultTitle}>候補のお店</Text>
      )}
      {restaurants && (
        <KeyboardAwareScrollView enableResetScrollToCoords={false}>
          {restaurants && search.length !== 0 && (
            <>
              <FlatList
                data={restaurants}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate("restaurant", { restaurant: item });
                    }}
                  >
                    <View style={styles.restaurant}>
                      <View style={styles.restaurantContent}>
                        <Text style={styles.restaurantName}>{item.name}</Text>
                        <Text
                          style={styles.area}
                        >{`${item.code.prefname} ${item.code.areaname_s}`}</Text>
                      </View>
                      <Icon type="entypo" name="chevron-right" color="#ccc" />
                    </View>
                  </TouchableWithoutFeedback>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("search-list-restaurants", { search })
                }
              >
                <View style={styles.allRestaurant}>
                  <Text style={styles.allRestaurantText}>全ての候補を見る</Text>
                  <Icon
                    type="entypo"
                    name="chevron-right"
                    color="#ccc"
                    containerStyle={{ marginRight: 10 }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </>
          )}
        </KeyboardAwareScrollView>
      )}
      {isNotSearchResults && (
        <View style={styles.notResultsText}>
          <Text>お店が見つかりません。</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingTop: 30,
  },
  searchBar: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    height: 40,
  },
  resultTitle: {
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
  allRestaurant: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  allRestaurantText: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  notResultsText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchRestaurantsScreen;
