import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import {
  AirbnbRating,
  Button,
  Input,
  Icon,
  Avatar,
} from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { map, size, filter } from "lodash";
import uuid from "random-uuid-v4";
import firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";

import colors from "../../constants/Colors";

const db = firebase.firestore();

const AddReviewScreen = (props) => {
  const { navigation, route } = props;
  const { restaurant, setReload } = route.params;
  const { id, name } = restaurant;
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({
    rating: false,
    title: "",
    review: "",
  });
  const [spinner, setSpinner] = useState(false);
  const [imagesSelected, setImagesSelected] = useState([]);

  navigation.setOptions({
    headerLeft: () => (
      <Icon
        type="entypo"
        name="cross"
        color="#000"
        size={35}
        onPress={closeHandler}
        containerStyle={{ marginLeft: 5 }}
      />
    ),
  });

  const addRevew = () => {
    setErrors({
      rating: false,
      title: "",
      review: "",
    });
    if (!rating || !title || !review) {
      setErrors({
        rating: !rating && true,
        title: !title && "タイトルが入力されていません",
        review: !review && "口コミが入力されていません",
      });
    } else {
      setSpinner(true);
      uploadImageStorage().then((response) => {
        const user = firebase.auth().currentUser;
        const paylod = {
          idUser: user.uid,
          nameUser: user.displayName,
          avatarUser: user.photoURL,
          idRestaurant: id,
          nameRestaurant: name,
          title: title,
          imagesRestaurant: response,
          reviewText: review,
          rating: rating,
          createAt: new Date(),
        };

        db.collection("reviews")
          .add(paylod)
          .then(() => {
            setSpinner(false);
            setRating(null);
            setTitle("");
            setReview("");
            setImagesSelected([]);
            navigation.goBack();
            setReload(true);
          })
          .catch(() => {
            setSpinner(false);
          });
      });
    }
  };

  const uploadImageStorage = async () => {
    const imageBlob = [];

    await Promise.all(
      map(imagesSelected, async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase.storage().ref("restaurants").child(uuid());
        await ref.put(blob).then(async (result) => {
          await firebase
            .storage()
            .ref(`restaurants/${result.metadata.name}`)
            .getDownloadURL()
            .then((photoUrl) => {
              imageBlob.push(photoUrl);
            });
        });
      })
    );

    return imageBlob;
  };

  const closeHandler = () => {
    Alert.alert(
      "投稿編集を保存していませんが、終了してよろしいですか？",
      "",
      [
        {
          text: "いいえ",
          style: "cancel",
        },
        {
          text: "はい",
          onPress: () => {
            setRating(null);
            setTitle("");
            setReview("");
            setImagesSelected([]);
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.restaurantName}>{name}</Text>
        <View style={styles.ratingWrap}>
          <View style={styles.ratingContainer}>
            <AirbnbRating
              selectedColor={colors.primary}
              reviewColor={colors.primary}
              count={5}
              reviews={["1.0", "2.0", "3.0", "4.0", "5.0"]}
              defaultRating={0}
              size={25}
              onFinishRating={(value) => {
                setRating(value);
              }}
              reviewSize={21}
            />
          </View>
          {errors.rating && (
            <View style={styles.errorRating}>
              <Text style={styles.errorText}>評価をしてください</Text>
            </View>
          )}
        </View>
        <Input
          placeholder="タイトルを入れてください"
          containerStyle={styles.inputTitle}
          inputContainerStyle={styles.inputTitleContainer}
          inputStyle={styles.inputTitleText}
          multiline={true}
          onChange={(e) => setTitle(e.nativeEvent.text)}
          autoCapitalize="none"
          autoCorrect={false}
          errorMessage={errors.title}
          errorStyle={styles.errorText}
        />
        <Input
          placeholder="口コミ本文を入れてください"
          inputContainerStyle={styles.inputContainer}
          multiline={true}
          onChange={(e) => setReview(e.nativeEvent.text)}
          autoCapitalize="none"
          autoCorrect={false}
          errorMessage={errors.review}
          errorStyle={styles.errorText}
        />
        <UploadImage
          imagesSelected={imagesSelected}
          setImagesSelected={setImagesSelected}
        />
        <Button
          title="投稿する"
          containerStyle={styles.postButtonContainer}
          buttonStyle={styles.postButton}
          titleStyle={styles.postButtonTitle}
          onPress={addRevew}
        />
      </ScrollView>
      <Spinner
        visible={spinner}
        overlayColor="rgba(0,0,0,0.5)"
        animation="fade"
      />
    </>
  );
};

const UploadImage = (props) => {
  const { imagesSelected, setImagesSelected } = props;

  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (resultPermissions !== "denied") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        setImagesSelected([...imagesSelected, result.uri]);
      }
    }
  };

  const removeImage = (image) => {
    Alert.alert(
      "画像を削除しますか？",
      "",
      [
        {
          text: "いいえ",
          style: "cancel",
        },
        {
          text: "はい",
          onPress: () => {
            setImagesSelected(
              filter(imagesSelected, (imageUrl) => imageUrl !== image)
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.imageContainer}>
      {size(imagesSelected) < 5 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.cameraIcon}
          onPress={imageSelect}
        />
      )}
      {map(imagesSelected, (imageRestaurant, index) => (
        <Avatar
          key={index}
          style={styles.image}
          source={{ uri: imageRestaurant }}
          onPress={() => removeImage(imageRestaurant)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 10,
    flex: 1,
  },
  restaurantName: {
    fontSize: 17,
    fontWeight: "bold",
  },
  ratingWrap: {
    marginBottom: 40,
  },
  ratingContainer: {
    height: 90,
    justifyContent: "flex-end",
  },
  errorRating: {
    alignItems: "center",
    marginTop: 10,
  },
  errorText: {
    fontSize: 14,
    color: "red",
  },
  inputTitle: {
    marginBottom: 10,
  },
  inputTitleContainer: {
    borderBottomWidth: 0,
  },
  inputTitleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  postButtonContainer: {
    flex: 1,
    marginHorizontal: 7,
    marginBottom: Platform.OS === "ios" ? 90 : 70,
  },
  postButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  postButtonTitle: {
    fontSize: 17,
  },
  imageContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 50,
  },
  cameraIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    height: 68,
    width: 68,
    backgroundColor: "#e3e3e3",
  },
  image: {
    width: 68,
    height: 68,
    marginRight: 8,
  },
});

export default AddReviewScreen;
