import React from "react";
import { ScrollView, View, Text } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import { getCategoryImagesPath } from "../../utils/getCategoryImagesPath";
import { getConditionsImagesPath } from "../../utils/getConditionsImagesPath";

const ListCategory = (props) => {
  const { navigation, route } = props;
  const { categories, type, pref, areaLarge } = route.params;

  return (
    <ScrollView>
      {map(categories, (category, index) => {
        let name, headerTitle, imagePath;

        switch (type) {
          case "categories":
            name = category.category_l_name;
            headerTitle = "ジャンル一覧";
            imagePath = getCategoryImagesPath(
              category.category_l_code,
              "image"
            );
            break;
          case "conditions":
            name = category.name;
            headerTitle = "条件一覧";
            imagePath = getConditionsImagesPath(category.type);
            break;
          case "area":
            name = category.area_name;
            headerTitle = "エリアを指定";
            break;
          default:
            console.log("not type");
        }

        navigation.setOptions({
          title: headerTitle,
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

        return (
          <ListItem
            key={index}
            title={name}
            titleStyle={{ fontSize: 15 }}
            containerStyle={{
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
              paddingVertical: 12,
            }}
            leftAvatar={
              type !== "area"
                ? {
                    source: imagePath,
                  }
                : null
            }
            rightIcon={{ type: "entypo", name: "chevron-right", color: "#aaa" }}
            onPress={() =>
              type === "area"
                ? navigation.navigate("list-pref", {
                    pref,
                    areaLarge,
                    code: category.area_code,
                    name,
                  })
                : navigation.navigate("list-restaurants", { category, type })
            }
          />
        );
      })}
    </ScrollView>
  );
};

export default ListCategory;
