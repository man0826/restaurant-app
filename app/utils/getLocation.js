import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export const getLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    console.log("error");
  }

  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};
