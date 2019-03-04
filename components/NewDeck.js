import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
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
    if (this.state.title.length < 3) return;
    this.props.handleDeckAddition(this.state.title);
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Choose a title for the new deck.</Text>

        <TextInput
          style={styles.input}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
          placeholder="Deck Title"
        />

        <MainTextButton onPress={() => this.handleSubmit()}>
          Create Deck
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

const mapDispatchToProps = dispatch => {
  return {
    handleDeckAddition: title => {
      dispatch(handleNewDeck(title));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewDeck);
