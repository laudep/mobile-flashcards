import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { handleNewDeck } from "../actions";
import MainTextButton from "./MainTextButton";
import Colors from "../constants/Colors";
import { Constants } from "expo";

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
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <Text>Choose a title for the new deck.</Text>

        <TextInput
          style={styles.input}
          onChangeText={title => this.setState({ title })}
          value={title}
          placeholder="Deck Title"
        />

        <MainTextButton
          disabled={title.length < 3}
          onPress={() => this.handleSubmit()}
        >
          Create Deck
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
    justifyContent: "center"
  },
  input: {
    backgroundColor: Colors.primary,
    padding: 10,
    margin: 20
  }
});

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    handleDeckAddition: title => dispatch(handleNewDeck(title)),
    toDeck: title =>
      navigation.navigate("Deck", {
        id: title
      })
    // toHomeScreen: () => navigation.navigate("Home")
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewDeck);
