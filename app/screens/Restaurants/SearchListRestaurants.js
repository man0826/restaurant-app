import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";

import ListItemRestaurant from "../../components/Restaurants/ListItemRestaurant";
import { getSearchRestaurantsApi } from "../../api/restaurants";

const LogoTitle = (props) => {
  const { name, totalPage } = props;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: Platform.OS === "ios" ? 0 : 8,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: Platform.OS === "ios" ? 3 : 0,
          color: "#000",
        }}
      >
        {name}
      </Text>
      {totalPage && <Text style={{ color: "#000" }}>{totalPage}件</Text>}
    </View>
  );
};

const SearchListRestaurants = (props) => {
  const { navigation, route } = props;
  const { search } = route.params;
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    getSearchRestaurantsApi(search, page).then((response) => {
      const totalPages = response.total_hit_count;
      setTotalPage(totalPages);
      setSpinner(false);
      if (page <= totalPages) {
        if (!restaurants) {
          setRestaurants(response.rest);
          setIsLoading(true);
        } else {
          setRestaurants([...restaurants, ...response.rest]);
        }
      } else {
        setIsLoading(false);
      }
    });
  }, [page]);

  navigation.setOptions({
    headerTitle: () => <LogoTitle name="検索結果" totalPage={totalPage} />,
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

  const onMoreHandler = () => {
    setPage(page + 20);
  };

  return (
    <>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <ListItemRestaurant restaurant={item} navigation={navigation} />
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
  );
};

const FooterList = (props) => {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={{ marginTop: 15, marginBottom: 20 }}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return null;
  }
};

export default SearchListRestaurants;
