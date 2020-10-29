import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";

const ImagesReview = (props) => {
  const { images } = props;

  switch (images.length) {
    case 1:
      return (
        <View style={{ flex: 1, margin: 1 }}>
          <Image
            PlaceholderContent={<ActivityIndicator color="#fff" />}
            style={{ width: "100%", height: 220 }}
            source={{ uri: images[0] }}
          />
        </View>
      );
    case 2:
      return (
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 2, margin: 1 }}>
            <Image
              PlaceholderContent={<ActivityIndicator color="#fff" />}
              style={{ width: "100%", height: 170 }}
              source={{ uri: images[0] }}
            />
          </View>
          <View style={{ flex: 2, margin: 1 }}>
            <Image
              PlaceholderContent={<ActivityIndicator color="#fff" />}
              style={{ width: "100%", height: 170 }}
              source={{ uri: images[1] }}
            />
          </View>
        </View>
      );
    case 3:
      return (
        <View>
          <View style={{ flex: 1, margin: 1 }}>
            <Image
              PlaceholderContent={<ActivityIndicator color="#fff" />}
              style={{ width: "100%", height: 220 }}
              source={{ uri: images[0] }}
            />
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 2, margin: 1 }}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 170 }}
                source={{ uri: images[1] }}
              />
            </View>
            <View style={{ flex: 2, margin: 1 }}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 170 }}
                source={{ uri: images[2] }}
              />
            </View>
          </View>
        </View>
      );
    case 4:
      return (
        <View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 2, margin: 1 }}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 170 }}
                source={{ uri: images[0] }}
              />
            </View>
            <View style={{ flex: 2, margin: 1 }}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 170 }}
                source={{ uri: images[1] }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 2, margin: 1 }}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 170 }}
                source={{ uri: images[2] }}
              />
            </View>
            <View style={{ flex: 2, margin: 1 }}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 170 }}
                source={{ uri: images[3] }}
              />
            </View>
          </View>
        </View>
      );
    case 5:
      return (
        <View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 2, margin: 1 }}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 170 }}
                source={{ uri: images[0] }}
              />
            </View>
            <View style={{ flex: 2, margin: 1 }}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 170 }}
                source={{ uri: images[1] }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 2, margin: 1 }}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 130 }}
                source={{ uri: images[2] }}
              />
            </View>
            <View style={{ flex: 2, margin: 1 }}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 130 }}
                source={{ uri: images[3] }}
              />
            </View>
            <View style={{ flex: 2, margin: 1 }}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={{ width: "100%", height: 130 }}
                source={{ uri: images[4] }}
              />
            </View>
          </View>
        </View>
      );
    default:
      return null;
  }
};

export default ImagesReview;
