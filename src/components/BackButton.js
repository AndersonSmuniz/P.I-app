import React from "react";
import { TouchableOpacity } from "react-native";
import Back from "../assets/back.svg";

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Back width="35" height="35" fill="#fff" />
    </TouchableOpacity>
  );
};

export default BackButton;
