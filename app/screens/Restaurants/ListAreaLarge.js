import React from "react";
import { ScrollView } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";

const ListAreaLarge = (props) => {
  const { navigation, route } = props;
  const { areaLarge, code, name } = route.params;

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

  const areaLargeList = areaLarge.filter(
    (large) => large.pref.pref_code === code
  );

  return (
    <ScrollView>
      {map(areaLargeList, (large, index) => {
        return (
          <ListItem
            key={index}
            title={large.areaname_l}
            titleStyle={{ fontSize: 15 }}
            containerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
              paddingVertical: 12,
            }}
            rightIcon={{ type: "entypo", name: "chevron-right", color: "#aaa" }}
            onPress={() =>
              navigation.navigate("list-restaurants", {
                category: large,
                type: "area",
              })
            }
          />
        );
      })}
    </ScrollView>
  );
};

export default ListAreaLarge;
