import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Button, Icon } from "react-native-elements";
import firebase from "firebase";

import colors from "../../constants/Colors";

const ChangeNameScreen = (props) => {
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
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>お名前</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNewDisplayName(text)}
        value={newDisplayName}
        placeholder={"例） 山田 太郎"}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.changeButtonWrap}>
        <Button
          title="変更する"
          containerStyle={styles.changeButtonContainer}
          buttonStyle={styles.changeButton}
          onPress={onSubmit}
          loading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  inputLabel: {
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  changeButtonWrap: {
    alignItems: "center",
  },
  changeButtonContainer: {
    marginTop: 40,
    width: "90%",
  },
  changeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
  },
});

export default ChangeNameScreen;
