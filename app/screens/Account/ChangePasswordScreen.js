import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Icon, Button } from "react-native-elements";
import { size } from "lodash";
import firebase from "firebase";

import { reauthenticate } from "../../utils/firebase";
import colors from "../../constants/Colors";

const ChangePasswordScreen = (props) => {
  const { navigation } = props;
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [errors, setErrors] = useState({});
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

  const onChange = (value, type) => {
    setFormData({ ...formData, [type]: value });
  };

  const onSubmit = async () => {
    setErrors({});

    if (
      !formData.password ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      setErrors({
        password: !formData.password && "パスワードを入力してください",
        newPassword:
          !formData.newPassword && "新しいパスワードを入力してください",
        repeatNewPassword:
          !formData.repeatNewPassword && "確認用パスワードを入力してください",
      });
    } else if (size(formData.newPassword) < 6) {
      setErrors({
        newPassword: "パスワードを6文字以上入力してください",
      });
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      setErrors({
        repeatNewPassword: "パスワードが一致しません",
      });
    } else {
      setIsLoading(true);
      await reauthenticate(formData.password)
        .then(async () => {
          await firebase
            .auth()
            .currentUser.updatePassword(formData.newPassword)
            .then(() => {
              setIsLoading(false);
              firebase.auth().signOut();
              navigation.pop(2);
            })
            .catch(() => {
              setIsLoading(false);
            });
        })
        .catch(() => {
          setErrors({ password: "パスワードが正しくありません" });
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputPassword}>
        <Text style={styles.inputLabel}>
          現在設定しているパスワードを入力してください。
        </Text>
        <TextInput
          placeholder="パスワードを入力"
          style={styles.input}
          password={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => onChange(value, "password")}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>
      <View style={styles.inputNewPassword}>
        <Text style={styles.inputLabel}>
          新しいパスワードを入力してください。
        </Text>
        <TextInput
          placeholder="パスワードを入力"
          style={styles.input}
          password={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => onChange(value, "newPassword")}
        />
        {errors.newPassword && (
          <Text style={styles.errorText}>{errors.newPassword}</Text>
        )}
      </View>
      <TextInput
        placeholder="パスワードを入力（確認）"
        style={styles.input}
        password={true}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(value) => onChange(value, "repeatNewPassword")}
      />
      {errors.repeatNewPassword && (
        <Text style={styles.errorText}>{errors.repeatNewPassword}</Text>
      )}
      <View style={styles.changeButtonWrap}>
        <Button
          title="変更する"
          containerStyle={styles.changeButtonContainer}
          buttonStyle={styles.changeButton}
          onPress={onSubmit}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  inputLabel: {
    marginBottom: 5,
  },
  inputPassword: {
    marginBottom: 40,
  },
  inputNewPassword: {
    marginBottom: 15,
  },
  input: {
    height: 45,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  changeButtonWrap: {
    alignItems: "center",
  },
  changeButtonContainer: {
    marginTop: 40,
    width: "90%",
  },
  changeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
  },
});

export default ChangePasswordScreen;
