import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ModalBox from "../ModalBox";

const ModalMap = (props) => {
  const { setIsModalMapOpen, isModalMapOpen, restaurant } = props;

  const location = {
    latitude: parseFloat(restaurant.latitude),
    longitude: parseFloat(restaurant.longitude),
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  return (
    <ModalBox isModalOpen={isModalMapOpen} setIsModalOpen={setIsModalMapOpen}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={location}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
        />
      </MapView>
    </ModalBox>
  );
};

export default ModalMap;
