import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { StyleSheet, View } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import { pink } from "./constants/Colors";

const store = createStore(reducer, middleware);

const stackNavigator = createStackNavigator({
  DeckList: {
    screen: DeckList
  },
  Deck: {
    screen: Deck
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
