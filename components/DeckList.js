import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";

import Colors from "../constants/Colors";
import { connect } from "react-redux";
import { handleInitialData } from "../actions";

class DeckList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate("NewDeck")}>
          {Platform.OS === "ios" ? (
            <Ionicons name="ios-add" color={Colors.primary} size={40} />
          ) : (
            <MaterialIcons name="add" color={Colors.primary} size={40} />
          )}
        </TouchableOpacity>
      )
    };
  };

  componentDidMount() {
    this.props.getInitialData();
  }

  navigateToDeck = id => {
    this.props.navigation.navigate("Deck", {
      id: id
    });
  };

  _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.navigateToDeck(item.title)}
      style={styles.deck}
    >
      <Text>{item.title}</Text>
      <Text>{"Contains " + item.questions.length + " cards"}</Text>
    </TouchableOpacity>
  );

  _keyExtractor = (item, index) => item.title;

  render() {
    const { decks, loading } = this.props;
    return (
      <View style={styles.container}>
        {loading === true ? (
          <Text>Please create a flashcard deck.</Text>
        ) : (
          <FlatList
            style={styles.deckList}
            data={Object.values(decks)}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightPurple,
    alignItems: "center",
    justifyContent: "center"
  },
  deckList: {
    backgroundColor: Colors.lightPurple,
    flex: 1
  },
  deck: {
    backgroundColor: Colors.primary,
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

function mapDispatchToProps(dispatch) {
  return {
    getInitialData: () => dispatch(handleInitialData())
  };
}

function mapStateToProps({ decks }) {
  return {
    decks,
    loading: Object.keys(decks).length === 0 && decks.constructor === Object
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList);
