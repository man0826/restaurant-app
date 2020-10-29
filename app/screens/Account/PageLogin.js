import React, { useState } from "react";
import { View, Text, ImageBackground, Dimensions } from "react-native";
import { Input, Icon } from "react-native-elements";
import { Button } from "react-native-elements";
import { isEmpty } from "lodash";
import * as firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";

import { validateEmail } from "../../utils/validations";
import LoginFacebook from "../../components/Account/LoginFacebook";

const screenHeight = Dimensions.get("screen").height;

const PageLogin = (props) => {
  const { type } = props;
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
          type !== "post" && navigation.navigate("account");
          setSpinner(false);
        })
        .catch(() => {
          setLoginError(true);
          setSpinner(false);
        });
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../../../assets/img/login.jpg")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: screenHeight,
        }}
      >
        <Icon
          type="entypo"
          name="cross"
          size={35}
          color="#fff"
          containerStyle={{ position: "absolute", top: 50, left: 10 }}
          onPress={() => navigation.goBack()}
        />
        <View style={{ paddingHorizontal: 10, paddingTop: 120 }}>
          {loginError && (
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Text
                style={{
                  color: "red",
                  fontSize: 16,
                  textShadowColor: "rgba(0, 0, 0, 0.75)",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 1,
                }}
              >
                ログイン情報が正しくありません
              </Text>
            </View>
          )}
          <Input
            label="メールアドレス"
            labelStyle={{ color: "#fff", fontSize: 17 }}
            inputContainerStyle={{
              borderBottomColor: "#fff",
              borderBottomWidth: 2,
            }}
            containerStyle={{ marginBottom: 20 }}
            inputStyle={{ color: "#fff" }}
            autoCapitalize="none"
            autoCorrect={false}
            errorMessage={errors.email}
            errorStyle={{
              fontSize: 16,
              textShadowColor: "rgba(0, 0, 0, 0.75)",
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 1,
            }}
            onChangeText={(value) => onChange(value, "email")}
          />
          <Input
            label="パスワード"
            labelStyle={{ color: "#fff", fontSize: 17 }}
            inputContainerStyle={{
              borderBottomColor: "#fff",
              borderBottomWidth: 2,
            }}
            secureTextEntry={true}
            containerStyle={{ marginBottom: 50 }}
            inputStyle={{ color: "#fff" }}
            autoCapitalize="none"
            autoCorrect={false}
            errorMessage={errors.password}
            errorStyle={{
              fontSize: 16,
              textShadowColor: "rgba(0, 0, 0, 0.75)",
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 1,
            }}
            onChangeText={(value) => onChange(value, "password")}
          />
          <View style={{ alignItems: "center" }}>
            <Button
              type="outline"
              containerStyle={{ marginBottom: 30 }}
              titleStyle={{ color: "#fff" }}
              buttonStyle={{
                borderColor: "#fff",
                borderWidth: 1,
                borderRadius: 50,
                paddingVertical: 13,
                width: 250,
              }}
              title="ログイン"
              titleStyle={{ fontWeight: "bold", color: "#fff" }}
              onPress={onSubmit}
            />
            <Text
              style={{
                fontSize: 17,
                color: "#fff",
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              または
            </Text>
            <LoginFacebook />
          </View>
        </View>
      </ImageBackground>
      <Spinner
        visible={spinner}
        textContent="読み込み中..."
        textStyle={{ color: "#fff", fontSize: 14, marginTop: -40 }}
        overlayColor="rgba(0,0,0,0.5)"
        animation="fade"
      />
    </>
  );
};

export default PageLogin;
