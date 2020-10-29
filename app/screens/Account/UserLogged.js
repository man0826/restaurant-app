import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Alert } from "react-native";
import { Button, ListItem, Avatar } from "react-native-elements";
import { map } from "lodash";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const UserLogged = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [reload, setReload] = useState(false);
  const navigation = useNavigation();

  navigation.setOptions({
    headerShown: false,
  });

  useEffect(() => {
    setReload(false);
    const user = firebase.auth().currentUser;
    setUserInfo(user);
  }, [reload]);

  const logoutHandler = () => {
    Alert.alert(
      "ログアウトしますか？",
      "",
      [
        {
          text: "いいえ",
          style: "cancel",
        },
        {
          text: "はい",
          onPress: () => {
            firebase.auth().signOut();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const listMenu = [
    {
      title: "会員情報の登録・変更",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () =>
        navigation.navigate("account-info-change", { userInfo, setReload }),
    },
    {
      title: "投稿を表示",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => navigation.navigate("my-reviews"),
    },
  ];

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera !== "denied") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        uploadImage(result.uri)
          .then(() => {
            updatePhotoUrl();
          })
          .catch(() => {
            console.log("Error");
          });
      }
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`avatar/${userInfo.uid}`);
    return ref.put(blob);
  };

  const updatePhotoUrl = () => {
    firebase
      .storage()
      .ref(`avatar/${userInfo.uid}`)
      .getDownloadURL()
      .then(async (response) => {
        const update = {
          photoURL: response,
        };
        await firebase.auth().currentUser.updateProfile(update);
        setReload(true);
      })
      .catch(() => {
        console.log("Error");
      });
  };

  if (!userInfo) {
    return null;
  }

  const { photoURL, displayName, email } = userInfo;

  return (
    <View>
      <View
        style={{
          height: 120,
          backgroundColor: "#ffcc99",
          alignItems: "center",
          marginBottom: 100,
        }}
      >
        <Avatar
          rounded
          size={100}
          containerStyle={{
            borderWidth: 5,
            borderColor: "#fff",
            marginTop: 60,
          }}
          showAccessory
          onAccessoryPress={changeAvatar}
          renderPlaceholderContent={<ActivityIndicator color="#fff" />}
          source={
            photoURL
              ? { uri: photoURL }
              : require("../../../assets/img/avatar-default.jpg")
          }
        />
        <Text style={{ fontSize: 18, marginTop: 15 }}>
          {displayName ? displayName : ""}
        </Text>
      </View>
      <View style={{ borderBottomColor: "#e3e3e3", borderBottomWidth: 1 }}>
        {map(listMenu, (menu, index) => (
          <ListItem
            key={index}
            title={menu.title}
            leftIcon={{
              type: menu.iconType,
              name: menu.iconNameLeft,
              color: menu.iconColorLeft,
            }}
            rightIcon={{
              type: menu.iconType,
              name: menu.iconNameRight,
              color: menu.iconColorRight,
            }}
            containerStyle={styles.menuItem}
            onPress={menu.onPress}
          />
        ))}
      </View>

      <Button
        title="ログアウト"
        type="clear"
        containerStyle={{ marginTop: 15 }}
        buttonStyle={{ backgroundColor: "#fff", paddingVertical: 17 }}
        titleStyle={{ fontSize: 15, color: "#333" }}
        onPress={logoutHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnCloseSessionText: {
    color: "#00a680",
  },
  menuItem: {
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
  },
  viewUserInfo: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
});

export default UserLogged;
