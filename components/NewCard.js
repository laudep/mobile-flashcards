import { CenterView, TextInput, TitleText } from "./styled";
import React, { Component } from "react";

import TextButton from "./TextButton";
import { connect } from "react-redux";
import { getId } from "../utils/helpers";
import { handleNewCard } from "../actions";

class NewCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  updateState = (text, category) => {
    this.setState(prevState => ({
      ...prevState,
      [category]: text
    }));
  };

  handleSubmit = () => {
    const { handleCardAddition, toCardOverview } = this.props;
    const card = {
      question: this.state.question,
      answer: this.state.answer
    };
    handleCardAddition(card);
    toCardOverview();
  };

  render() {
    return (
      <CenterView behavior="padding" enabled>
        <TitleText>Enter question and answer</TitleText>
        <TextInput
          onChangeText={text => this.updateState(text, "question")}
          value={this.state.question}
          placeholder="Question"
        />
        <TextInput
          onChangeText={text => this.updateState(text, "answer")}
          value={this.state.answer}
          placeholder="Answer"
        />

        <TextButton
          onPress={() => this.handleSubmit()}
          disabled={!(this.state.answer.trim() && this.state.question.trim())}
        >
          Create Card
        </TextButton>
      </CenterView>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    id: getId(props.navigation)
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const id = getId(navigation);
  return {
    handleCardAddition: card => {
      dispatch(handleNewCard(id, card));
    },
    toCardOverview: () =>
      navigation.navigate("Deck", {
        id: id
      })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCard);
