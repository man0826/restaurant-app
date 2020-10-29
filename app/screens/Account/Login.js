import React, { useState } from "react";
import { View, Text, ActivityIndicator, Platform } from "react-native";
import { Button, Avatar } from "react-native-elements";

import ModalLogin from "../../components/Account/ModalLogin";
import ModalRegister from "../../components/Account/ModalRegister";

const Login = (props) => {
  const { navigation } = props;
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });
  const [registerErrors, setRegisterErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 120,
          backgroundColor: "#ffcc99",
          alignItems: "center",
          marginBottom: 100,
        }}
      >
        <Avatar
          rounded
          size={100}
          containerStyle={{
            borderWidth: 5,
            borderColor: "#fff",
            marginTop: 60,
          }}
          renderPlaceholderContent={<ActivityIndicator color="#fff" />}
          source={require("../../../assets/img/avatar-default.jpg")}
        />
        <Text style={{ fontSize: 18, marginTop: 15 }}>未登録</Text>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 10,
          alignItems: "center",
          padding: 20,
          marginBottom: 40,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 3 }}>
          お店のレビューを投稿できたり、
        </Text>
        <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: "bold" }}>
          好みに合ったお店が見つかりやすくなります。
        </Text>
        <Button
          title="ログインする"
          buttonStyle={{ backgroundColor: "#ff9933" }}
          onPress={() => {
            Platform.OS === "ios"
              ? setIsModalLoginOpen(true)
              : navigation.navigate("page-login");
            setLoginErrors({ email: "", password: "" });
            setLoginError(false);
          }}
          containerStyle={{ width: "100%" }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16, marginRight: 5 }}>
          アカウントをお持ちでないですか？
        </Text>
        <Button
          type="clear"
          title="登録する"
          titleStyle={{ fontSize: 18, fontWeight: "bold" }}
          onPress={() => {
            Platform.OS === "ios"
              ? setIsModalRegisterOpen(true)
              : navigation.navigate("page-register");
            setRegisterErrors({ email: "", password: "", repeatPassword: "" });
            setRegisterError(false);
          }}
        />
      </View>
      <ModalLogin
        setIsModalOpen={setIsModalLoginOpen}
        isModalOpen={isModalLoginOpen}
        errors={loginErrors}
        setErrors={setLoginErrors}
        loginError={loginError}
        setLoginError={setLoginError}
      />
      <ModalRegister
        setIsModalOpen={setIsModalRegisterOpen}
        isModalOpen={isModalRegisterOpen}
        errors={registerErrors}
        setErrors={setRegisterErrors}
        registerError={registerError}
        setRegisterError={setRegisterError}
      />
    </View>
  );
};

export default Login;
