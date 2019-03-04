import React, { Component } from "react";
import { Constants } from "expo";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import Pluralize from "pluralize";
import MainTextButton from "./MainTextButton";
import { getId } from "../utils/helpers";

class Deck extends Component {
  render() {
    const { deck, navigation } = this.props;
    const questionCount = deck.questions.length;
    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{Pluralize("Card", questionCount, true)}</Text>

        <MainTextButton
          onPress={() =>
            navigation.navigate("NewCard", {
              id: deck.title
            })
          }
        >
          New Card
        </MainTextButton>

        <MainTextButton
          disabled={questionCount === 0}
          onPress={() =>
            navigation.navigate("Quiz", {
              id: deck.title
            })
          }
        >
          Start a Quiz
        </MainTextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightPurple,
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center"
  }
});

function mapStateToProps({ decks }, props) {
  const id = getId(props.navigation);
  const deck = Object.values(decks).filter(deck => deck.title === id);
  return {
    deck: deck[0]
  };
}

export default connect(mapStateToProps)(Deck);
