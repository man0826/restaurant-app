import React from "react";
import { Image } from "react-native-elements";
import Carousel from "react-native-snap-carousel";

const CarouselImages = (props) => {
  const { arrayImageUrl, slideWidth, itemWidth, height } = props;

  const renderItem = ({ item }) => {
    return (
      <Image style={{ width: itemWidth, height }} source={{ uri: item }} />
    );
  };

  return (
    <Carousel
      layout={"default"}
      data={arrayImageUrl}
      sliderWidth={slideWidth}
      itemWidth={itemWidth}
      renderItem={renderItem}
      loop
      autoplay
    />
  );
};

export default CarouselImages;
