import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { warningBackground } from "../constants/Colors";

class Deck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Deck</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: warningBackground,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Deck;
