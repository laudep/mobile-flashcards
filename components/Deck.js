import { CenterView, DescriptionText, TitleText } from "./styled";
import React, { Component } from "react";

import Pluralize from "pluralize";
import TextButton from "./TextButton";
import { connect } from "react-redux";
import { getId } from "../utils/helpers";

class Deck extends Component {
  componentDidMount = () => {
    const { skipNewDeck } = this.props;
    // avoid returning to "Create Deck" after creation
    skipNewDeck();
    this._sub = this.props.navigation.addListener("didFocus", payload => {
      skipNewDeck();
    });
  };

  componentWillUnmount() {
    this._sub.remove();
  }

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

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    // Force back button behaviour to return to deck list
    // (avoids returning to "Create Deck" after creation)
    skipNewDeck: () => {
      navigation.dispatch({
        type: "RemoveNewDeckScreen"
      });
    }
  };
};

function mapStateToProps({ decks }, props) {
  const id = getId(props.navigation);
  const deck = Object.values(decks).filter(deck => deck.title === id)[0];
  return {
    deck: deck
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
