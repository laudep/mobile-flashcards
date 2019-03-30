import { CenterView, DescriptionText, TitleText } from "./styled";
import React, { Component } from "react";

import Pluralize from "pluralize";
import TextButton from "./TextButton";
import { connect } from "react-redux";
import { getId } from "../utils/helpers";

class Deck extends Component {
  render() {
    const { deck, navigation } = this.props;
    const questionCount = deck.questions.length;
    return (
      <CenterView>
        <TitleText color="black">{deck.title}</TitleText>
        <DescriptionText>
          {Pluralize("Card", questionCount, true)}
        </DescriptionText>

        <TextButton
          onPress={() =>
            navigation.navigate("NewCard", {
              id: deck.title
            })
          }
        >
          New Card
        </TextButton>

        <TextButton
          disabled={questionCount === 0}
          onPress={() =>
            navigation.navigate("Quiz", {
              id: deck.title,
              title: `Quiz: '${deck.title}' `
            })
          }
        >
          Start a Quiz
        </TextButton>
      </CenterView>
    );
  }
}

function mapStateToProps({ decks }, props) {
  const id = getId(props.navigation);
  const deck = Object.values(decks).filter(deck => deck.title === id)[0];
  return {
    deck: deck
  };
}

export default connect(mapStateToProps)(Deck);
