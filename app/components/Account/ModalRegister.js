import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";

import { validateEmail } from "../../utils/validations";
import ModalBox from "../ModalBox";
import RegisterFacebook from "./RegisterFacebook";

const ModalRegister = (props) => {
  const {
    setIsModalOpen,
    isModalOpen,
    errors,
    setErrors,
    registerError,
    setRegisterError,
  } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [spinner, setSpinner] = useState(false);
  const navigation = useNavigation();

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
          setIsModalOpen(true);
        })
        .catch(() => {
          setRegisterError(true);
          setSpinner(false);
          setIsModalOpen(true);
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
          {registerError && (
            <View style={styles.loginError}>
              <Text style={styles.loginErrorText}>
                このメールアドレスでは登録できません。
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
            leftIcon={{
              type: "material-community",
              name: "email",
              color: "#fff",
            }}
            leftIconContainerStyle={styles.inputLeftIcon}
            autoCorrect={false}
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
          <View style={{ alignItems: "center" }}>
            <Button
              type="outline"
              containerStyle={{ marginBottom: 40 }}
              buttonStyle={styles.loginButton}
              title="登録する"
              titleStyle={styles.loginButtonTitle}
              onPress={onSubmit}
            />
            <Text style={styles.bottomText}>または</Text>
            <RegisterFacebook />
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
    marginBottom: 20,
  },
  inputRepeatPassword: {
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

export default ModalRegister;
