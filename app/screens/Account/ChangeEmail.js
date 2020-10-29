import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Button, Icon } from "react-native-elements";
import firebase from "firebase";

import { validateEmail } from "../../utils/validations";
import colors from "../../utils/colors";

const ChangeEmail = (props) => {
  const { navigation, route } = props;
  const { email, setReload } = route.params;
  const [error, setError] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = () => {
    setError(null);
    if (!newEmail) {
      setError("新しいメールアドレスを入力してください");
    } else if (email === newEmail) {
      setError("同じメールアドレスです");
    } else if (!validateEmail(newEmail)) {
      setError("メールアドレスの書式に誤りがあります");
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .currentUser.updateEmail(newEmail)
        .then(() => {
          setIsLoading(false);
          setReload(true);
          navigation.pop(2);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
      <Text style={{ marginBottom: 5 }}>メールアドレス</Text>
      <TextInput
        style={{
          height: 45,
          borderColor: "#aaa",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          backgroundColor: "#fff",
        }}
        onChangeText={(text) => setNewEmail(text)}
        value={newEmail}
        placeholder={"例） example@outlook.jp"}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
      <View style={{ alignItems: "center" }}>
        <Button
          title="変更する"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={onSubmit}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 40,
    width: "90%",
  },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
  },
});

export default ChangeEmail;
