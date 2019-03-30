import { CenterView, TitleText } from "./styled";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { clearNotification, setLocalNotification } from "../utils/helpers";

import Colors from "../constants/Colors";
import TextButton from "./TextButton";
import { connect } from "react-redux";
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
    // remove notification and set one for tomorrow
    clearNotification().then(setLocalNotification);
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
      correctAnswers: correctAnswers,
      showAnswer: false
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
      <CenterView>
        <TitleText color="black">
          {showAnswer ? answerText : questionText}{" "}
        </TitleText>
        <Text> {`${questionIndex + 1}/${questions.length}`} </Text>
        <View>
          <TextButton onPress={this.toggleAnswer}>
            {`Show ${showAnswer ? "question" : "answer"}`}
          </TextButton>
        </View>
        <TextButton
          onPress={() => this.handleAnswer(true)}
          color={Colors.positive}
        >
          Correct
        </TextButton>
        <TextButton
          onPress={() => this.handleAnswer(false)}
          color={Colors.negative}
        >
          Incorrect
        </TextButton>
      </CenterView>
    );
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const id = getId(navigation);
  return {
    toQuizResult: (correctAnswers, totalQuestions) =>
      navigation.navigate("QuizResult", {
        id,
        correctAnswers,
        totalQuestions,
        title: `Quiz Result: '${id}' `
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
