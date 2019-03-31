import { CenterView, DescriptionText, TitleText } from "./styled";
import React, { Component } from "react";

import Colors from "../constants/Colors";
import DropdownAlert from "react-native-dropdownalert";
import Pluralize from "pluralize";
import TextButton from "./TextButton";
import { connect } from "react-redux";
import { getId } from "../utils/helpers";

class Deck extends Component {
  componentDidMount = () => {
    const { skipNewDeck, navigation, deck } = this.props;
    // avoid returning to "Create Deck" after creation
    skipNewDeck();
    this._sub = navigation.addListener("didFocus", payload => {
      const cardWasAdded = payload.state.params.cardWasAdded;
      skipNewDeck();
      // Show notification if card was added
      cardWasAdded &&
        this.dropdown.alertWithType(
          "info",
          "Card added",
          `Added a card to ${deck.title} 👋`
        );
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
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          infoColor={Colors.primary}
        />
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

function mapStateToProps({ decks }, { navigation }) {
  const id = getId(navigation);
  const deck = Object.values(decks).filter(deck => deck.title === id)[0];
  return {
    deck: deck,
    cardWasAdded: navigation.getParam("cardWasAdded", false)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
