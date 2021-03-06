import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";

import { validateEmail } from "../../utils/validations";
import ModalBox from "../ModalBox";
import LoginFacebook from "./LoginFacebook";

const ModalLogin = (props) => {
  const {
    setIsModalOpen,
    isModalOpen,
    type,
    errors,
    setErrors,
    loginError,
    setLoginError,
  } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [spinner, setSpinner] = useState(false);
  const navigation = useNavigation();

  const onChange = (value, type) => {
    setFormData({ ...formData, [type]: value });
  };

  const onSubmit = () => {
    setErrors({ email: "", password: "" });
    setLoginError(false);
    setSpinner(true);

    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      !validateEmail(formData.email)
    ) {
      setErrors({
        email:
          (isEmpty(formData.email) && "メールアドレスを入力してください") ||
          (!validateEmail(formData.email) && "メールアドレスの書式が違います"),
        password: isEmpty(formData.password) && "パスワードを入力してください",
      });
      setSpinner(false);
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          type !== "post" && navigation.navigate("account");
          setSpinner(false);
          setIsModalOpen(false);
        })
        .catch(() => {
          setLoginError(true);
          setSpinner(false);
        });
    }
  };

  return (
    <ModalBox
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      type="login"
    >
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/img/login.jpg")}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          {loginError && (
            <View style={styles.loginError}>
              <Text style={styles.loginErrorText}>
                ログイン情報が正しくありません
              </Text>
            </View>
          )}
          <Input
            label="メールアドレス"
            labelStyle={styles.inputLabel}
            containerStyle={styles.inputEmail}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            placeholder="example@outlook.jp"
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={{
              type: "material-community",
              name: "email",
              color: "#fff",
            }}
            leftIconContainerStyle={styles.inputLeftIcon}
            errorMessage={errors.email}
            errorStyle={styles.errorText}
            onChangeText={(value) => onChange(value, "email")}
          />
          <Input
            label="パスワード"
            labelStyle={styles.inputLabel}
            containerStyle={styles.inputPassword}
            inputContainerStyle={styles.inputContainer}
            placeholder="パスワード"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            inputStyle={styles.inputText}
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={{
              type: "material-community",
              name: "lock",
              color: "#fff",
            }}
            leftIconContainerStyle={styles.inputLeftIcon}
            errorMessage={errors.password}
            errorStyle={styles.errorText}
            onChangeText={(value) => onChange(value, "password")}
          />
          <View style={styles.loginButtonWrap}>
            <Button
              type="outline"
              containerStyle={styles.loginButtonContainer}
              titleStyle={styles.loginButtonTitle}
              buttonStyle={styles.loginButton}
              title="ログイン"
              onPress={onSubmit}
            />
            <Text style={styles.bottomText}>または</Text>
            <LoginFacebook />
          </View>
        </ImageBackground>
      </View>
      <Spinner
        visible={spinner}
        overlayColor="rgba(0,0,0,0.5)"
        animation="fade"
      />
    </ModalBox>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
  },
  loginError: {
    alignItems: "center",
    marginBottom: 15,
  },
  loginErrorText: {
    color: "red",
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 1,
  },
  inputEmail: {
    marginBottom: 20,
  },
  inputPassword: {
    marginBottom: 50,
  },
  inputContainer: {
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
  },
  inputLabel: {
    color: "#fff",
    fontSize: 17,
  },
  inputText: {
    color: "#fff",
  },
  inputLeftIcon: {
    marginRight: 10,
  },
  errorText: {
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 1,
  },
  loginButtonWrap: {
    alignItems: "center",
  },
  loginButtonContainer: {
    marginBottom: 40,
  },
  loginButtonTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  loginButton: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 15,
    width: 250,
  },
  bottomText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ModalLogin;
