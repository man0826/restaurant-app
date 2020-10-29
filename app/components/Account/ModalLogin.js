import React, { useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { Input, Icon } from "react-native-elements";
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
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../../assets/img/login.jpg")}
          resizeMode="cover"
          style={{ flex: 1, justifyContent: "center" }}
        >
          <View>
            {loginError && (
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
                containerStyle={{ marginBottom: 40 }}
                titleStyle={{ color: "#fff" }}
                buttonStyle={{
                  borderColor: "#fff",
                  borderWidth: 1,
                  borderRadius: 50,
                  paddingVertical: 15,
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
      </View>
      <Spinner
        visible={spinner}
        textContent="読み込み中..."
        textStyle={{ color: "#fff", fontSize: 14, marginTop: -40 }}
        overlayColor="rgba(0,0,0,0.5)"
        animation="fade"
      />
    </ModalBox>
  );
};

export default ModalLogin;
