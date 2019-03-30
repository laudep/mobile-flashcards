import { CenterView, DescriptionText, TitleText } from "./styled";

import React from "react";
import TextButton from "./TextButton";
import { connect } from "react-redux";
import { getId } from "../utils/helpers";

const QuizResult = props => {
  const { correctAnswers, totalQuestions, toScreen } = props;
  return (
    <CenterView>
      <TitleText>You finished the quiz!</TitleText>
      <DescriptionText color="black">
        Correct Answers: {correctAnswers} out of {totalQuestions}
      </DescriptionText>
      <DescriptionText>
        {((100 * correctAnswers) / totalQuestions).toFixed()}%
      </DescriptionText>

      <TextButton onPress={() => toScreen("Quiz")}>Restart Quiz</TextButton>

      <TextButton onPress={() => toScreen("Deck")}>Return to Deck</TextButton>
    </CenterView>
  );
};

const mapDispatchToProps = (dispatch, { navigation }) => {
  const id = getId(navigation);
  return {
    toScreen: screen =>
      navigation.navigate(screen, {
        id
      })
  };
};

const mapStateToProps = (state, { navigation }) => {
  const correctAnswers = navigation.getParam("correctAnswers", "1"),
    totalQuestions = navigation.getParam("totalQuestions", "1");
  return {
    correctAnswers,
    totalQuestions
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizResult);
