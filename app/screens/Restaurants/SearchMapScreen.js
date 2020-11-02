import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { map } from "lodash";

import { getLocation } from "../../utils/getLocation";
import { getLocationRestaurantsApi } from "../../api/restaurants";
import CarouselRestaurants from "../../components/Restaurants/CarouselRestaurants";
import { getCategoryImagesPath } from "../../utils/getCategoryImagesPath";
import Spinner from "react-native-loading-spinner-overlay";

const SearchMapScreen = (props) => {
  const { navigation } = props;
  const [location, setLocation] = useState({
    latitude: 31.5633896,
    longitude: 130.5522253,
  });

  const [restaurants, setRestaurants] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spinner, setSpinner] = useState(true);
  const [isNotRestaurants, setIsNotRestaurants] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  const carousel = useRef();

  useEffect(() => {
    setSpinner(true);
    setIsNotRestaurants(false);
    getLocation()
      .then((response) => {
        setLocation(response);
        getLocationRestaurantsApi(response)
          .then((response) => {
            setRestaurants(response.rest);
            setSpinner(false);
          })
          .catch(() => {
            setSpinner(false);
          });
      })
      .catch(() => {
        setSpinner(false);
      });
  }, []);

  const goToNextSlide = (index) => {
    carousel.current.snapToItem(index);
  };

  const getMapRestaurants = () => {
    setSpinner(true);
    setIsNotRestaurants(false);
    setIsShowButton(false);
    getLocationRestaurantsApi(location)
      .then((response) => {
        setRestaurants(response.rest);
        goToNextSlide(0);
        setSpinner(false);
      })
      .catch(() => {
        setIsNotRestaurants(true);
        setSpinner(false);
      });
  };

  if (!location) {
    return null;
  }

  return (
    <>
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.046,
          longitudeDelta: 0.026,
        }}
        loadingEnabled={true}
        showsMyLocationButton
        showsUserLocation={true}
        onRegionChange={() => {
          setIsShowButton(true);
        }}
        onRegionChangeComplete={(region) => {
          setLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        provider={PROVIDER_GOOGLE}
      >
        {map(restaurants, (restaurant, index) => {
          const code = restaurant.code.category_code_l[0];
          return (
            <Marker
              style={
                index === currentIndex ? { zIndex: 999 } : { zIndex: index }
              }
              key={index}
              coordinate={{
                latitude: Number(restaurant.latitude),
                longitude: Number(restaurant.longitude),
              }}
              onPress={() => goToNextSlide(index)}
              pinColor={index === currentIndex ? "red" : "blue"}
            >
              <View>
                <Image
                  style={
                    index === currentIndex
                      ? { width: 40, height: 47 }
                      : { width: 30, height: 36 }
                  }
                  source={
                    index === currentIndex
                      ? getCategoryImagesPath(code, "icon-active")
                      : getCategoryImagesPath(code, "icon")
                  }
                />
              </View>
            </Marker>
          );
        })}
      </MapView>
      <Icon
        type="entypo"
        name="chevron-left"
        size={35}
        color="#000"
        containerStyle={styles.pageBackIcon}
        onPress={() => navigation.goBack()}
      />
      {isShowButton && (
        <TouchableWithoutFeedback onPress={getMapRestaurants}>
          <View style={styles.searchButton}>
            <Icon type="material-community" name="reload" size={16} />
            <Text style={styles.searchButtonText}>このエリアで再検索</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      <View>
        {isNotRestaurants && (
          <View style={styles.noResult}>
            <Text style={styles.noResultText}>
              お店が見つかりませんでした。
            </Text>
            <Text style={styles.noResultText}>
              条件を変更してお探しください。
            </Text>
          </View>
        )}
        {restaurants && (
          <CarouselRestaurants
            restaurants={restaurants}
            carousel={carousel}
            navigation={navigation}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </View>
      <Spinner
        visible={spinner}
        overlayColor="rgba(0,0,0,0)"
        animation="fade"
        color="#000"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageBackIcon: {
    position: "absolute",
    top: 47,
    left: 6,
  },
  searchButton: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    flexDirection: "row",
    alignContent: "center",
  },
  searchButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },
  noResult: {
    marginVertical: 10,
  },
  noResultText: {
    textAlign: "center",
  },
});

export default SearchMapScreen;
