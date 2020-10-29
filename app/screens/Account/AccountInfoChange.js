import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { Button, Icon } from "react-native-elements";

import colors from "../../utils/colors";

const AccountInfoChange = (props) => {
  const { navigation, route } = props;
  const { userInfo, setReload } = route.params;

  const { displayName, email, photoURL } = userInfo;

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
    <View style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          backgroundColor: "#eee",
          paddingVertical: 8,
          paddingHorizontal: 15,
        }}
      >
        <Text style={styles.infoTitle}>お名前</Text>
      </View>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.infoText}>
          {displayName ? displayName : "設定されていません"}
        </Text>
        <Button
          type="outline"
          title="登録・変更"
          buttonStyle={{
            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: 5,
            paddingHorizontal: 15,
          }}
          titleStyle={{ color: colors.primary, fontSize: 15 }}
          onPress={() =>
            navigation.navigate("change-name", { displayName, setReload })
          }
        />
      </View>
      <View
        style={{
          backgroundColor: "#eee",
          paddingVertical: 8,
          paddingHorizontal: 15,
        }}
      >
        <Text style={styles.infoTitle}>メールアドレス</Text>
      </View>
      <View
        style={{
          padding: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.infoText}>{email}</Text>
        <Button
          type="outline"
          title="変更"
          buttonStyle={{
            borderWidth: 1,
            borderColor: colors.primary,
            borderRadius: 5,
            paddingHorizontal: 15,
          }}
          titleStyle={{ color: colors.primary, fontSize: 15 }}
          onPress={() =>
            navigation.navigate("change-email", { email, setReload })
          }
        />
      </View>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("change-password")}
      >
        <View
          style={{
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderTopColor: "#ddd",
            borderTopWidth: 1,
            borderBottomColor: "#ddd",
            borderBottomWidth: 1,
          }}
        >
          <Text style={styles.infoTitle}>パスワードの変更</Text>
          <Icon type="entypo" name="chevron-right" color="#aaa" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  infoTitle: {
    fontSize: 16,
  },
  infoText: {
    fontSize: 17,
  },
});

export default AccountInfoChange;
