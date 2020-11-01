import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";

import {
  getCategoryRestaurantsApi,
  getConditionsRestaurantsApi,
  getAreaRestaurantsApi,
} from "../../api/restaurants";
import ListItemRestaurant from "../../components/Restaurants/ListItemRestaurant";

const LogoTitle = (props) => {
  const { name, totalPage } = props;
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{name}</Text>
      {totalPage && <Text style={styles.headerSubTitle}>{totalPage}件</Text>}
    </View>
  );
};

const ListRestaurantsScreen = (props) => {
  const { navigation, route } = props;
  const { category, type } = route.params;
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(null);
  const [spinner, setSpinner] = useState(true);

  let name, params;

  switch (type) {
    case "categories":
      name = category.category_l_name;
      params = category.category_l_code;
      break;
    case "conditions":
      name = category.name;
      params = category.type;
      break;
    case "area":
      name = category.areaname_l;
      params = category.areacode_l;
      break;
    default:
      console.log("not type");
  }

  navigation.setOptions({
    headerTitle: () => <LogoTitle name={name} totalPage={totalPage} />,
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

  useEffect(() => {
    switch (type) {
      case "categories":
        getCategoryRestaurantsApi(params, page).then((response) => {
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
        break;
      case "conditions":
        getConditionsRestaurantsApi(params, page).then((response) => {
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
        break;
      case "area":
        getAreaRestaurantsApi(params, page).then((response) => {
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
        break;
      default:
        return;
    }
  }, [page]);

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
        ListFooterComponent={<FooterIndicator isLoading={isLoading} />}
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

const FooterIndicator = (props) => {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.footerIndicator}>
        <ActivityIndicator />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 0 : 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: Platform.OS === "ios" ? 3 : 0,
    color: "#000",
  },
  headerSubTitle: {
    color: "#000",
  },
  footerIndicator: {
    marginTop: 15,
    marginBottom: 20,
  },
});

export default ListRestaurantsScreen;
