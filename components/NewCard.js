import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { handleNewCard } from "../actions";
import { connect } from "react-redux";
import MainTextButton from "./MainTextButton";
import Colors from "../constants/Colors";
import { Constants } from "expo";
import { getId } from "../utils/helpers";

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
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <Text>Fill in the card's question and answer.</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.updateState(text, "question")}
          value={this.state.question}
          placeholder="Question"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.updateState(text, "answer")}
          value={this.state.answer}
          placeholder="Answer"
        />

        <MainTextButton onPress={() => this.handleSubmit()}>
          Create Card
        </MainTextButton>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  input: {
    backgroundColor: Colors.primary,
    padding: 10,
    margin: 20
  }
});

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
