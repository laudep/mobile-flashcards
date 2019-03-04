import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import { Constants } from "expo";
import MainTextButton from "./MainTextButton";
import { getId } from "../utils/helpers";

class Quiz extends Component {
  state = {
    questionIndex: 0,
    showAnswer: false,
    correctAnswers: 0
  };

  handleAnswer = correct => {
    this.setState(prevState => ({
      ...prevState,
      questionIndex: prevState.questionIndex + 1,
      correctAnswers: correct
        ? prevState.correctAnswers + 1
        : prevState.correctAnswers
    }));
  };

  render() {
    let { deck, id } = this.props;
    let { questionIndex, showAnswer, correctAnswers } = this.state;
    let questions = deck.questions;

    if (questionIndex === questions.length) {
      return (
        <View>
          <Text>Quiz Results</Text>
          <Text>
            Correct Answers: {correctAnswers} out of {questions.length}
          </Text>
          <Text>
            Score: {((100 * correctAnswers) / questions.length).toFixed()}%
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{`${questionIndex + 1}/${questions.length}`}</Text>

        {showAnswer ? (
          <View>
            <Text>{questions[questionIndex].answer}</Text>

            <MainTextButton
              onPress={() =>
                this.setState(prevState => ({
                  ...prevState,
                  showAnswer: !prevState.showAnswer
                }))
              }
            >
              Show question
            </MainTextButton>
          </View>
        ) : (
          <View>
            <Text>{questions[questionIndex].question}</Text>

            <MainTextButton
              onPress={() =>
                this.setState(prevState => ({
                  ...prevState,
                  showAnswer: !prevState.showAnswer
                }))
              }
            >
              Show Answer
            </MainTextButton>
          </View>
        )}

        <MainTextButton onPress={() => this.handleAnswer(true)}>
          Correct
        </MainTextButton>

        <MainTextButton onPress={() => this.handleAnswer(false)}>
          Incorrect
        </MainTextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    alignItems: "center",
    justifyContent: "center"
  }
});

function mapStateToProps({ decks }, props) {
  const id = getId(props.navigation);
  const deck = Object.values(decks).filter(deck => deck.title === id)[0];
  return {
    deck,
    id
  };
}

export default connect(mapStateToProps)(Quiz);
