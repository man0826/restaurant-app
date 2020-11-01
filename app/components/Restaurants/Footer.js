import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Icon, Button } from "react-native-elements";
import colors from "../../constants/Colors";

const Footer = (props) => {
  const {
    userLogged,
    setIsModalReviewOpen,
    isModalReviewOpen,
    setErrors,
    navigation,
    restaurant,
    setReload,
  } = props;

  return (
    <View style={styles.footer}>
      {userLogged && (
        <Button
          title="投稿する"
          type="outline"
          containerStyle={styles.postButtonContainer}
          titleStyle={styles.postButtonTitle}
          buttonStyle={styles.postButton}
          onPress={() => {
            Platform.OS === "ios"
              ? setIsModalReviewOpen(!isModalReviewOpen)
              : navigation.navigate("add-review", {
                  restaurant,
                  setReload,
                });
            setErrors({
              rating: false,
              title: "",
              review: "",
            });
          }}
        />
      )}
      <Button
        icon={
          <Icon name="phone" type="material-community" color="#fff" size={18} />
        }
        title="電話をする"
        containerStyle={styles.telButtonContainer}
        buttonStyle={styles.telButton}
        titleStyle={styles.telButtonTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    borderTopColor: "#eee",
    borderTopWidth: 1,
    backgroundColor: "rgba(255,255,255,.95)",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 25 : 20,
    paddingHorizontal: 15,
  },
  postButtonContainer: {
    backgroundColor: "#fff",
  },
  postButtonTitle: {
    fontSize: 16,
    color: colors.primary,
  },
  postButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    paddingVertical: 11,
  },
  telButtonContainer: {
    flex: 1,
    marginLeft: 12,
  },
  telButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
  },
  telButtonTitle: {
    fontSize: 16,
    marginLeft: 5,
  },
});

export default Footer;
