import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { Button, Icon } from "react-native-elements";

import colors from "../../constants/Colors";

const AccountInfoChangeScreen = (props) => {
  const { navigation, route } = props;
  const { userInfo, setReload } = route.params;

  const { displayName, email } = userInfo;

  navigation.setOptions({
    headerLeft: () => (
      <Icon
        name="chevron-left"
        type="entypo"
        color="#000"
        size={35}
        onPress={() => {
          navigation.goBack();
        }}
        containerStyle={{ marginLeft: 5 }}
      />
    ),
  });

  return (
    <View style={styles.container}>
      <View style={styles.infoTitleContainer}>
        <Text style={styles.infoTitle}>お名前</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoItemText}>
          {displayName ? displayName : "設定されていません"}
        </Text>
        <Button
          type="outline"
          title="登録・変更"
          buttonStyle={styles.changeButton}
          titleStyle={styles.changeButtonText}
          onPress={() =>
            navigation.navigate("change-name", { displayName, setReload })
          }
        />
      </View>
      <View style={styles.infoTitleContainer}>
        <Text style={styles.infoTitle}>メールアドレス</Text>
      </View>
      <View style={styles.infoItem}>
        <Text style={styles.infoItemText}>{email}</Text>
        <Button
          type="outline"
          title="変更"
          buttonStyle={styles.changeButton}
          titleStyle={styles.changeButtonText}
          onPress={() =>
            navigation.navigate("change-email", { email, setReload })
          }
        />
      </View>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("change-password")}
      >
        <View style={[styles.infoItem, styles.changePassword]}>
          <Text style={styles.infoTitle}>パスワードの変更</Text>
          <Icon type="entypo" name="chevron-right" color="#aaa" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  infoItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  infoItemText: {
    fontSize: 17,
  },
  infoTitleContainer: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#ddd",
  },
  infoTitle: {
    fontSize: 16,
  },
  changeButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  changeButtonText: {
    color: colors.primary,
    fontSize: 15,
  },
  changePassword: {
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
});

export default AccountInfoChangeScreen;
