import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import { handleInitialData } from "../actions";

class DeckList extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  navigateToDeck = id => {
    this.props.navigation.navigate("Deck", {
      id: id
    });
  };

  render() {
    const { decks, loading } = this.props;
    return (
      <View style={styles.container}>
        {loading === true ? (
          <Text>Please create a flashcard deck.</Text>
        ) : (
          <View style={{ backgroundColor: Colors.white }}>
            {Object.values(decks).map(deck => (
              <View style={styles.deck} key={deck.title}>
                <Text>{deck.title}</Text>
                <Text>{"Contains " + deck.questions.length + " cards"}</Text>
                <TouchableOpacity
                  onPress={() => this.navigateToDeck(deck.title)}
                >
                  <Text>View Deck</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orange,
    alignItems: "center",
    justifyContent: "center"
  },
  deck: {
    backgroundColor: Colors.pink,
    margin: 20
  }
});

function mapStateToProps({ decks }) {
  return {
    decks,
    loading: Object.keys(decks).length === 0 && decks.constructor === Object
  };
}

export default connect(mapStateToProps)(DeckList);
