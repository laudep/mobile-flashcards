import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { StyleSheet, View } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import Quiz from "./components/Quiz";
import NewDeck from "./components/NewDeck";
import NewCard from "./components/NewCard";
import Colors from "./constants/Colors";

const store = createStore(reducer, middleware);

const stackNavigator = createStackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      title: "Decks"
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: "Deck"
    },
    headerStyle: {
      backgroundColor: Colors.lightPurple
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: "New Deck"
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: "New Card"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz"
    }
  }
});

const AppContainer = createAppContainer(stackNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b93fb3"
  }
});
