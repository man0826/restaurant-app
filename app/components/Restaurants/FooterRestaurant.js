import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { Icon, Button } from "react-native-elements";
import colors from "../../utils/colors";

const FooterRestaurant = (props) => {
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
          containerStyle={{ backgroundColor: "#fff" }}
          titleStyle={{
            fontSize: 16,
            color: colors.primary,
          }}
          buttonStyle={{
            borderColor: colors.primary,
            borderWidth: 1,
            paddingHorizontal: 8,
            paddingVertical: 11,
          }}
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
        containerStyle={{ flex: 1, marginLeft: 12 }}
        buttonStyle={{
          backgroundColor: colors.primary,
          paddingHorizontal: 8,
          paddingVertical: 12,
        }}
        titleStyle={{ fontSize: 16, marginLeft: 5 }}
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
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
});

export default FooterRestaurant;
