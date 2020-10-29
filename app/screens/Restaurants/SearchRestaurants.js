import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { getSearchRestaurantsApi } from "../../api/restaurants";
import colors from "../../utils/colors";

const SearchRestaurants = (props) => {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState(null);
  const [isNoSearchResults, setIsNoSearchResults] = useState(false);

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

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.primary,
          paddingTop: 30,
        }}
      >
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
          containerStyle={{
            backgroundColor: colors.primary,
            flex: 1,
          }}
          inputContainerStyle={{ backgroundColor: "#fff", height: 40 }}
          onSubmitEditing={() =>
            navigation.navigate("search-list-restaurants", { search })
          }
        />
      </View>
      {restaurants && search.length !== 0 && (
        <Text style={{ marginHorizontal: 10, marginVertical: 5 }}>
          候補のお店
        </Text>
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
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#fff",
                        borderBottomColor: "#eee",
                        borderBottomWidth: 1,
                        padding: 10,
                      }}
                    >
                      <View style={{ flex: 1, paddingRight: 10 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            lineHeight: 17,
                            marginBottom: 3,
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{ fontSize: 13, color: "#777" }}
                        >{`${item.code.prefname} ${item.code.areaname_s}`}</Text>
                      </View>
                      <Icon
                        type="entypo"
                        name="chevron-right"
                        color="#ccc"
                        containerStyle={{ marginRight: 5 }}
                      />
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ marginHorizontal: 15, marginVertical: 15 }}>
                    全ての候補を見る
                  </Text>
                  <Icon
                    type="entypo"
                    name="chevron-right"
                    color="#ccc"
                    containerStyle={{ marginRight: 15 }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </>
          )}
        </KeyboardAwareScrollView>
      )}
      {isNoSearchResults && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>お店が見つかりません。</Text>
        </View>
      )}
    </View>
  );
};

export default SearchRestaurants;
