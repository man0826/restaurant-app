import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Button, Icon } from "react-native-elements";
import firebase from "firebase";

import colors from "../../utils/colors";

const ChangeName = (props) => {
  const { navigation, route } = props;
  const { displayName, setReload } = route.params;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  navigation.setOptions({
    headerLeft: () => (
      <Icon
        name="chevron-left"
        type="entypo"
        color="#000"
        size={35}
        onPress={() => {
          navigation.goBack();
        }}
        containerStyle={{ marginLeft: 5 }}
      />
    ),
  });

  const onSubmit = () => {
    setError(null);
    if (!newDisplayName) {
      setError("新しいお名前を入力してください");
    } else if (displayName === newDisplayName) {
      setError("同じお名前です");
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          setIsLoading(false);
          setReload(true);
          navigation.pop(2);
        })
        .catch(() => {
          setError("Error al actualizar el nombre.");
          console.log("error");
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
      <Text style={{ marginBottom: 5 }}>お名前</Text>
      <TextInput
        style={{
          height: 45,
          borderColor: "#aaa",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          backgroundColor: "#fff",
        }}
        onChangeText={(text) => setNewDisplayName(text)}
        value={newDisplayName}
        placeholder={"例） 山田 太郎"}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
      <View style={{ alignItems: "center" }}>
        <Button
          title="変更する"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={onSubmit}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 40,
    width: "90%",
  },
  btn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
  },
});

export default ChangeName;
