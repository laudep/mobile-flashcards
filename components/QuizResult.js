import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import MainTextButton from "./MainTextButton";
import { getId } from "../utils/helpers";

const QuizResult = props => {
  const { correctAnswers, totalQuestions, toScreen } = props;
  return (
    <View style={styles.container}>
      <Text>You finished the quiz!</Text>
      <Text>
        Correct Answers: {correctAnswers} out of {totalQuestions}
      </Text>
      <Text>{((100 * correctAnswers) / totalQuestions).toFixed()}%</Text>

      <MainTextButton onPress={() => toScreen("Quiz")}>
        Restart Quiz
      </MainTextButton>

      <MainTextButton onPress={() => toScreen("Deck")}>
        Return to Deck
      </MainTextButton>
    </View>
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
  console.log(navigation);
  const correctAnswers = navigation.getParam("correctAnswers", "1"),
    totalQuestions = navigation.getParam("totalQuestions", "1");
  return {
    correctAnswers,
    totalQuestions
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizResult);
