import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { handleNewCard } from "../actions";
import { connect } from "react-redux";
import MainTextButton from "./MainTextButton";
import Colors from "../constants/Colors";
import { Constants } from "expo";

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
    const { handleCardAddition, id, navigation } = this.props;
    const card = {
      question: this.state.question,
      answer: this.state.answer
    };
    handleCardAddition(id, card);
    navigation.navigate("Deck", {
      id: id
    });
  };

  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    paddingTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    backgroundColor: Colors.primary,
    padding: 10,
    margin: 20
  }
});

function mapStateToProps(state, props) {
  return {
    id: props.navigation.getParam("id", "No id found.")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleCardAddition: (id, card) => {
      dispatch(handleNewCard(id, card));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCard);
