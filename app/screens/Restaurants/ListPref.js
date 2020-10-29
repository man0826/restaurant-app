import React from "react";
import { ScrollView, View, Text } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";

const ListPref = (props) => {
  const { navigation, route } = props;
  const { pref, areaLarge, code, name } = route.params;

  navigation.setOptions({
    title: name,
    headerLeft: () => (
      <Icon
        name="chevron-left"
        type="entypo"
        color="#000"
        size={35}
        containerStyle={{ marginLeft: 5 }}
        onPress={() => {
          navigation.goBack();
        }}
      />
    ),
  });

  const prefList = pref.filter((pre) => pre.area_code === code);

  return (
    <ScrollView>
      {map(prefList, (pre, index) => {
        return (
          <ListItem
            key={index}
            title={pre.pref_name}
            titleStyle={{ fontSize: 15 }}
            containerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
              paddingVertical: 12,
            }}
            rightIcon={{ type: "entypo", name: "chevron-right", color: "#aaa" }}
            onPress={() =>
              navigation.navigate("list-area-large", {
                code: pre.pref_code,
                areaLarge,
                name: pre.pref_name,
              })
            }
          />
        );
      })}
    </ScrollView>
  );
};

export default ListPref;
