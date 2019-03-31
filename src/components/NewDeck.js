import { CenterView, TextInput, TitleText } from "./styled";
import React, { Component } from "react";

import TextButton from "./TextButton";
import { connect } from "react-redux";
import { handleNewDeck } from "../actions";

class NewDeck extends Component {
  state = {
    title: ""
  };

  handleSubmit = () => {
    const { handleDeckAddition, toDeck } = this.props;
    const { title } = this.state;

    if (title.length < 3) return;

    handleDeckAddition(title).then(() => toDeck(title));
  };

  render() {
    const { title } = this.state;

    return (
      <CenterView behavior="padding" enabled>
        <TitleText>Enter deck title</TitleText>

        <TextInput
          onChangeText={title => this.setState({ title })}
          value={title}
          placeholder="Deck Title"
        />

        <TextButton
          disabled={title.length < 3}
          onPress={() => this.handleSubmit()}
        >
          Create Deck
        </TextButton>
      </CenterView>
    );
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    handleDeckAddition: title => dispatch(handleNewDeck(title)),
    toDeck: title => {
      navigation.navigate("Deck", {
        id: title
      });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewDeck);
