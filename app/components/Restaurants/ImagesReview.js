import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";

const ImagesReview = (props) => {
  const { images } = props;

  switch (images.length) {
    case 1:
      return (
        <View style={styles.imageContainer1}>
          <Image
            PlaceholderContent={<ActivityIndicator color="#fff" />}
            style={styles.image1}
            source={{ uri: images[0] }}
          />
        </View>
      );
    case 2:
      return (
        <View style={styles.imagesWrap}>
          <View style={styles.imageContainer2}>
            <Image
              PlaceholderContent={<ActivityIndicator color="#fff" />}
              style={styles.image2}
              source={{ uri: images[0] }}
            />
          </View>
          <View style={styles.imageContainer2}>
            <Image
              PlaceholderContent={<ActivityIndicator color="#fff" />}
              style={styles.image2}
              source={{ uri: images[1] }}
            />
          </View>
        </View>
      );
    case 3:
      return (
        <>
          <View style={styles.imageContainer1}>
            <Image
              PlaceholderContent={<ActivityIndicator color="#fff" />}
              style={styles.image1}
              source={{ uri: images[0] }}
            />
          </View>
          <View style={styles.imagesWrap}>
            <View style={styles.imageContainer2}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={styles.image2}
                source={{ uri: images[1] }}
              />
            </View>
            <View style={styles.imageContainer2}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={styles.image2}
                source={{ uri: images[2] }}
              />
            </View>
          </View>
        </>
      );
    case 4:
      return (
        <>
          <View style={styles.imagesWrap}>
            <View style={styles.imageContainer2}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={styles.image2}
                source={{ uri: images[0] }}
              />
            </View>
            <View style={styles.imageContainer2}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={styles.image2}
                source={{ uri: images[1] }}
              />
            </View>
          </View>
          <View style={styles.imagesWrap}>
            <View style={styles.imageContainer2}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={styles.image2}
                source={{ uri: images[2] }}
              />
            </View>
            <View style={styles.imageContainer2}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={styles.image2}
                source={{ uri: images[3] }}
              />
            </View>
          </View>
        </>
      );
    case 5:
      return (
        <>
          <View style={styles.imagesWrap}>
            <View style={styles.imageContainer2}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={styles.image2}
                source={{ uri: images[0] }}
              />
            </View>
            <View style={styles.imageContainer2}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={styles.image2}
                source={{ uri: images[1] }}
              />
            </View>
          </View>
          <View style={styles.imagesWrap}>
            <View style={styles.imageContainer2}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={styles.image3}
                source={{ uri: images[2] }}
              />
            </View>
            <View style={styles.imageContainer2}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={styles.image3}
                source={{ uri: images[3] }}
              />
            </View>
            <View style={styles.imageContainer2}>
              <Image
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                style={styles.image3}
                source={{ uri: images[4] }}
              />
            </View>
          </View>
        </>
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  imagesWrap: {
    flexDirection: "row",
    flex: 1,
  },
  imageContainer1: {
    flex: 1,
    margin: 1,
  },
  imageContainer2: {
    flex: 2,
    margin: 1,
  },
  image1: {
    width: "100%",
    height: 200,
  },
  image2: {
    width: "100%",
    height: 150,
  },
  image3: {
    width: "100%",
    height: 110,
  },
});

export default ImagesReview;
