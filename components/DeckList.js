import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import { handleInitialData } from "../actions";

class DeckList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          onPress={() => navigation.navigate("NewDeck")}
          title="New"
          color={Colors.primary}
        />
      )
    };
  };

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
              <TouchableOpacity
                onPress={() => this.navigateToDeck(deck.title)}
                key={deck.title}
                style={styles.deck}
              >
                <Text>{deck.title}</Text>
                <Text>{"Contains " + deck.questions.length + " cards"}</Text>
              </TouchableOpacity>
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
    margin: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});

function mapStateToProps({ decks }) {
  return {
    decks,
    loading: Object.keys(decks).length === 0 && decks.constructor === Object
  };
}

export default connect(mapStateToProps)(DeckList);
