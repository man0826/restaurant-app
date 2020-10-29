import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import openMap from "react-native-open-maps";
import { map } from "lodash";

const Map = (props) => {
  const { restaurant } = props;
  const [loc, setLoc] = useState({
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const openAppMap = () => {
    openMap({
      latitude: parseFloat(location.latitude),
      longitude: parseFloat(location.longitude),
      zoom: 19,
    });
  };

  return (
    <View>
      <MapView
        style={{ width: "100%", height: 400 }}
        initialRegion={loc}
        onRegionChange={(region) => {
          setLoc({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        onRegionChangeComplete={(region) => {
          setLoc({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        onPress={openAppMap}
      >
        <Marker
          coordinate={{
            latitude: loc.latitude,
            longitude: loc.longitude,
          }}
        />
      </MapView>
      <RestaurantInfo restaurant={restaurant} />
    </View>
  );
};

function RestaurantInfo(props) {
  const { restaurant } = props;
  const { address, access } = restaurant;

  const listInfo = [
    {
      text: address,
      iconName: "map-marker",
      iconType: "material-community",
      action: null,
    },
    {
      text: `${access.line}${access.station}${access.station_exit} ${access.walk}分`,
      iconName: "walk",
      iconType: "material-community",
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
              color: "#00a680",
            }}
            containerStyle={styles.containerListItem}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  viewRestaurantInfo: {
    backgroundColor: "#fff",
  },
  containerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
});

export default Map;
