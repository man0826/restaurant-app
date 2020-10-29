import React, { useState } from "react";
import { View, Text, ImageBackground, Dimensions } from "react-native";
import { Input, Icon } from "react-native-elements";
import { Button } from "react-native-elements";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";

import { validateEmail } from "../../utils/validations";
import RegisterFacebook from "../../components/Account/RegisterFacebook";

const screenHeight = Dimensions.get("screen").height;

const PageRegister = (props) => {
  const { navigation } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [registerError, setRegisterError] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const onChange = (value, type) => {
    setFormData({ ...formData, [type]: value });
  };

  const onSubmit = () => {
    setErrors({ email: "", password: "", repeatPassword: "" });
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
          {registerError && (
            <View style={{ alignItems: "center", marginBottom: 15 }}>
              <Text
                style={{
                  color: "red",
                  fontSize: 16,
                  textShadowColor: "rgba(0, 0, 0, 0.75)",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 1,
                }}
              >
                このメールアドレスでは登録できません。
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
            containerStyle={{ marginBottom: 20 }}
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
          <Input
            label="確認用パスワード"
            labelStyle={{ color: "#fff", fontSize: 17 }}
            inputContainerStyle={{
              borderBottomColor: "#fff",
              borderBottomWidth: 2,
            }}
            secureTextEntry={true}
            containerStyle={{ marginBottom: 20 }}
            inputStyle={{ color: "#fff" }}
            autoCapitalize="none"
            autoCorrect={false}
            errorMessage={errors.repeatPassword}
            errorStyle={{
              fontSize: 16,
              textShadowColor: "rgba(0, 0, 0, 0.75)",
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 1,
            }}
            onChangeText={(value) => onChange(value, "repeatPassword")}
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
              title="登録する"
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
            <RegisterFacebook />
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

export default PageRegister;
