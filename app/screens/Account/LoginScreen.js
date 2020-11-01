import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Button, Avatar } from "react-native-elements";

import ModalLogin from "../../components/Account/ModalLogin";
import ModalRegister from "../../components/Account/ModalRegister";
import colors from "../../constants/Colors";

const LoginScreen = (props) => {
  const { navigation } = props;
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });
  const [registerErrors, setRegisterErrors] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  return (
    <View>
      <View style={styles.header}>
        <Avatar
          rounded
          size={100}
          containerStyle={styles.avatar}
          renderPlaceholderContent={<ActivityIndicator color="#fff" />}
          source={require("../../../assets/img/avatar-default.jpg")}
        />
        <Text style={styles.userName}>未登録</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.loginContainerText}>
          お店のレビューを投稿できたり、
        </Text>
        <Text style={[styles.loginContainerText, { marginBottom: 15 }]}>
          好みに合ったお店が見つかりやすくなります。
        </Text>
        <Button
          title="ログインする"
          containerStyle={styles.loginButtonContainer}
          buttonStyle={styles.loginButton}
          onPress={() => {
            Platform.OS === "ios"
              ? setIsModalLoginOpen(true)
              : navigation.navigate("page-login", { type: "login" });
            setLoginErrors({ email: "", password: "" });
            setLoginError(false);
          }}
        />
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          アカウントをお持ちでないですか？
        </Text>
        <Button
          type="clear"
          title="登録する"
          titleStyle={styles.registerButton}
          onPress={() => {
            Platform.OS === "ios"
              ? setIsModalRegisterOpen(true)
              : navigation.navigate("page-register");
            setRegisterErrors({ email: "", password: "" });
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

const styles = StyleSheet.create({
  header: {
    height: 120,
    backgroundColor: "#ffcc99",
    alignItems: "center",
    marginBottom: 100,
  },
  avatar: {
    borderWidth: 5,
    borderColor: "#fff",
    marginTop: 60,
  },
  userName: {
    fontSize: 18,
    marginTop: 15,
  },
  loginContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    alignItems: "center",
    padding: 20,
    marginBottom: 40,
  },
  loginContainerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  loginButtonContainer: {
    width: "100%",
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    fontSize: 16,
    marginRight: 5,
  },
  registerButton: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
