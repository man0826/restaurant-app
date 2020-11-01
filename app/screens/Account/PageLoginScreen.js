import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import { Button } from "react-native-elements";
import { isEmpty } from "lodash";
import * as firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";

import { validateEmail } from "../../utils/validations";
import LoginFacebook from "../../components/Account/LoginFacebook";

const screenHeight = Dimensions.get("screen").height;

const PageLoginScreen = (props) => {
  const { type } = props.route.params;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const { navigation } = props;

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
          type !== "post"
            ? navigation.navigate("account")
            : navigation.goBack();
          setSpinner(false);
        })
        .catch(() => {
          console.log(100);
          setLoginError(true);
          setSpinner(false);
        });
    }
  };

  return (
    <View>
      <ImageBackground
        source={require("../../../assets/img/login.jpg")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <Icon
          type="entypo"
          name="cross"
          size={35}
          color="#fff"
          containerStyle={styles.closeIcon}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
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
            inputContainerStyle={styles.inputContainer}
            placeholder="パスワード"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            containerStyle={styles.inputPassword}
            inputStyle={styles.inputText}
            leftIcon={{
              type: "material-community",
              name: "lock",
              color: "#fff",
            }}
            leftIconContainerStyle={styles.inputLeftIcon}
            autoCapitalize="none"
            autoCorrect={false}
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
        </View>
      </ImageBackground>
      <Spinner
        visible={spinner}
        overlayColor="rgba(0,0,0,0.5)"
        animation="fade"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: screenHeight,
  },
  closeIcon: {
    position: "absolute",
    top: 60,
    left: 10,
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: screenHeight / 5,
  },
  loginError: {
    alignItems: "center",
    marginBottom: 20,
  },
  loginErrorText: {
    color: "red",
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  inputLabel: {
    color: "#fff",
    fontSize: 17,
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
  inputText: {
    color: "#fff",
  },
  inputLeftIcon: {
    marginRight: 10,
  },
  errorText: {
    fontSize: 16,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  loginButtonWrap: {
    alignItems: "center",
  },
  loginButton: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 13,
    width: 250,
  },
  loginButtonTitle: {
    fontWeight: "bold",
    color: "#fff",
  },
  loginButtonContainer: {
    marginBottom: 30,
  },
  bottomText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PageLoginScreen;
