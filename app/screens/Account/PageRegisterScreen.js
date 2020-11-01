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
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";

import { validateEmail } from "../../utils/validations";
import RegisterFacebook from "../../components/Account/RegisterFacebook";

const screenHeight = Dimensions.get("screen").height;

const PageRegisterScreen = (props) => {
  const { navigation } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const onChange = (value, type) => {
    setFormData({ ...formData, [type]: value });
  };

  const onSubmit = () => {
    setErrors({ email: "", password: "" });
    setSpinner(true);
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword) ||
      !validateEmail(formData.email) ||
      formData.password !== formData.repeatPassword ||
      size(formData.password) < 6
    ) {
      setErrors({
        email:
          (isEmpty(formData.email) && "メールアドレスを入力してください") ||
          (!validateEmail(formData.email) && "メールアドレスの書式が違います"),
        password:
          (isEmpty(formData.password) && "パスワードを入力してください") ||
          (size(formData.password) < 6 &&
            "パスワードは6文字以上入力してください") ||
          (formData.password !== formData.repeatPassword &&
            "パスワードが一致しません"),
      });
      setSpinner(false);
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          navigation.navigate("account");
          setSpinner(false);
        })
        .catch(() => {
          setRegisterError(true);
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
          {registerError && (
            <View style={styles.registerError}>
              <Text style={styles.registerErrorText}>
                このメールアドレスでは登録できません。
              </Text>
            </View>
          )}
          <Input
            label="メールアドレス"
            labelStyle={styles.inputLabel}
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.inputEmail}
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
          <Input
            label="確認用パスワード"
            labelStyle={styles.inputLabel}
            inputContainerStyle={styles.inputContainer}
            placeholder="確認用パスワード"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            containerStyle={styles.inputRepeatPassword}
            inputStyle={styles.inputText}
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={{
              type: "material-community",
              name: "lock",
              color: "#fff",
            }}
            leftIconContainerStyle={styles.inputLeftIcon}
            onChangeText={(value) => onChange(value, "repeatPassword")}
          />
          <View style={styles.registerButtonWrap}>
            <Button
              type="outline"
              containerStyle={styles.registerButtonContainer}
              buttonStyle={styles.registerButton}
              title="登録する"
              titleStyle={styles.registerButtonTitle}
              onPress={onSubmit}
            />
            <Text style={styles.bottomText}>または</Text>
            <RegisterFacebook />
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
    paddingTop: screenHeight / 6,
  },
  registerError: {
    alignItems: "center",
    marginBottom: 15,
  },
  registerErrorText: {
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
    marginBottom: 10,
  },
  inputPassword: {
    marginBottom: 10,
  },
  inputRepeatPassword: {
    marginBottom: 40,
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
  registerButtonWrap: {
    alignItems: "center",
  },
  registerButton: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 13,
    width: 250,
  },
  registerButtonContainer: {
    marginBottom: 30,
  },
  registerButtonTitle: {
    fontWeight: "bold",
    color: "#fff",
  },
  bottomText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PageRegisterScreen;
