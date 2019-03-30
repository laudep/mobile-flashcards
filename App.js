import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import Colors from "./constants/Colors";
import Deck from "./components/Deck";
import DeckList from "./components/DeckList";
import NewCard from "./components/NewCard";
import NewDeck from "./components/NewDeck";
import { Provider } from "react-redux";
import Quiz from "./components/Quiz";
import QuizResult from "./components/QuizResult";
import React from "react";
import { createStore } from "redux";
import middleware from "./middleware";
import reducer from "./reducers";
import { setLocalNotification } from "./utils/helpers";

const store = createStore(reducer, middleware);

// replace(/([a-z0-9])([A-Z])/g, '$1 $2'))

const stackNavigator = createStackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam("title", "Deck List")
      // headerRight: (
      //   <TouchableOpacity onPress={() => navigation.navigate("NewDeck")}>
      //     {Platform.OS === "ios" ? (
      //       <Ionicons name="ios-add" color={Colors.primary} size={40} />
      //     ) : (
      //       <MaterialIcons name="add" color={Colors.primary} size={40} />
      //     )}
      //   </TouchableOpacity>
      // )
    })
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam("title", "Deck")
    }),
    headerStyle: {
      backgroundColor: Colors.lightPurple
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam("title", "New Deck")
    })
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam("title", "New Card")
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam("title", "Quiz")
    })
  },
  QuizResult: {
    screen: QuizResult,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam("title", "Quiz Result")
    })
  }
});

const AppContainer = createAppContainer(stackNavigator);

export default class App extends React.Component {
  componentDidMount = () => {
    setLocalNotification();
  };

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
