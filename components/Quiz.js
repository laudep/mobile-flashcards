import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import MainTextButton from "./MainTextButton";
import { getId } from "../utils/helpers";

class Quiz extends Component {
  initState = {
    questionIndex: 0,
    showAnswer: false,
    correctAnswers: 0
  };

  state = this.initState;

  reset = () => this.setState(this.initState);

  toQuizResult = (correctAnswers, totalQuestions) => {
    this.props.toQuizResult(correctAnswers, totalQuestions);
    this.reset();
  };

  handleAnswer = correct => {
    const totalQuestions = this.props.deck.questions.length;
    const correctAnswers = correct
      ? this.state.correctAnswers + 1
      : this.state.correctAnswers;
    const questionIndex = this.state.questionIndex + 1;

    if (questionIndex === totalQuestions) {
      return this.toQuizResult(correctAnswers, totalQuestions);
    }

    this.setState(prevState => ({
      ...prevState,
      questionIndex: questionIndex,
      correctAnswers: correctAnswers
    }));
  };

  toggleAnswer = () =>
    this.setState(prevState => ({
      ...prevState,
      showAnswer: !prevState.showAnswer
    }));

  render() {
    const { deck } = this.props;
    const { questionIndex, showAnswer, correctAnswers } = this.state;
    const questions = deck.questions;

    if (questionIndex === questions.length) {
      return this.toQuizResult(correctAnswers, questions.length);
    }

    const questionText = questions[questionIndex].question,
      answerText = questions[questionIndex].answer;

    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{`${questionIndex + 1}/${questions.length}`}</Text>

        <View>
          <Text>{showAnswer ? answerText : questionText}</Text>

          <MainTextButton onPress={this.toggleAnswer}>
            {`Show ${showAnswer ? "question" : "answer"}`}
          </MainTextButton>
        </View>

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

function mapDispatchToProps(dispatch, { navigation }) {
  const id = getId(navigation);
  return {
    toQuizResult: (correctAnswers, totalQuestions) =>
      navigation.navigate("QuizResult", {
        id,
        correctAnswers,
        totalQuestions
      })
  };
}

function mapStateToProps({ decks }, { navigation }) {
  const id = getId(navigation);
  const deck = Object.values(decks).filter(deck => deck.title === id)[0];
  return {
    deck,
    id
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
