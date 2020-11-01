import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";

import UserLoggedScreen from "./UserLoggedScreen";
import LoginScreen from "./LoginScreen";

const AccountScreen = (props) => {
  const { navigation } = props;
  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setUserLogged(true) : setUserLogged(false);
    });
  }, []);

  if (userLogged === null)
    return (
      <Spinner visible={true} overlayColor="rgba(0,0,0,0.5)" animation="fade" />
    );

  return userLogged ? (
    <UserLoggedScreen navigation={navigation} />
  ) : (
    <LoginScreen navigation={navigation} />
  );
};

export default AccountScreen;
