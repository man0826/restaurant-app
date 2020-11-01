import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Alert } from "react-native";
import { Button, ListItem, Avatar } from "react-native-elements";
import { map } from "lodash";
import firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const UserLoggedScreen = (props) => {
  const { navigation } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [reload, setReload] = useState(false);

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
      iconNameLeft: "camera",
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

  const { photoURL, displayName } = userInfo;

  return (
    <View>
      <View style={styles.header}>
        <Avatar
          rounded
          size={100}
          containerStyle={styles.avatar}
          showAccessory
          onAccessoryPress={changeAvatar}
          renderPlaceholderContent={<ActivityIndicator color="#fff" />}
          source={
            photoURL
              ? { uri: photoURL }
              : require("../../../assets/img/avatar-default.jpg")
          }
        />
        <Text style={styles.userName}>{displayName ? displayName : ""}</Text>
      </View>
      <View style={styles.userList}>
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
            containerStyle={styles.userListItem}
            onPress={menu.onPress}
          />
        ))}
      </View>

      <Button
        title="ログアウト"
        type="clear"
        buttonStyle={styles.logoutButton}
        titleStyle={styles.logoutButtonTitle}
        onPress={logoutHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 120,
    backgroundColor: "#ffcc99",
    alignItems: "center",
    marginBottom: 100,
  },
  avatar: {
    borderWidth: 5,
    borderColor: "#fff",
    backgroundColor: "#fff",
    marginTop: 60,
  },
  userName: {
    fontSize: 18,
    marginTop: 15,
  },
  userList: {
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  userListItem: {
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
  },
  logoutButton: {
    backgroundColor: "#fff",
    paddingVertical: 17,
  },
  logoutButtonTitle: {
    fontSize: 15,
    color: "#333",
  },
});

export default UserLoggedScreen;
