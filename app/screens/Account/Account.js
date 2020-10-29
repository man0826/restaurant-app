import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";

import UserLogged from "./UserLogged";
import Login from "./Login";

const Account = (props) => {
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

  return userLogged ? <UserLogged /> : <Login navigation={navigation} />;
};

export default Account;
