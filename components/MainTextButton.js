import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export default function MainTextButton({
  children = {},
  onPress = () => {},
  style = {},
  disabled = false
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.wrapper, style]}
      onPress={onPress}
    >
      <Text style={[styles.text]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    height: 40,
    width: 200,
    borderRadius: 10,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20
  },
  text: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold"
  }
});
