import React from "react";
import { Platform } from "react-native";
import { Icon } from "react-native-elements";
import Modal from "react-native-modalbox";

const ModalBox = (props) => {
  const {
    children,
    isModalOpen,
    setIsModalOpen,
    type,
    modalCloseHandler,
  } = props;

  return (
    <Modal
      isOpen={isModalOpen}
      coverScreen={true}
      swipeToClose={false}
      backdropOpacity={0}
      keyboardTopOffset={0}
    >
      <Icon
        type="entypo"
        name="cross"
        size={40}
        color={type === "login" ? "#fff" : "#000"}
        onPress={() => {
          type === "addReview"
            ? modalCloseHandler()
            : setIsModalOpen(!isModalOpen);
        }}
        containerStyle={{
          position: "absolute",
          top: Platform.OS === "ios" ? 43 : 18,
          left: 10,
          zIndex: 100,
        }}
      />
      {children}
    </Modal>
  );
};

export default ModalBox;
