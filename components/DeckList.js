import { FlatList, Platform, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";

import Colors from "../constants/Colors";
import { connect } from "react-redux";
import { handleInitialData } from "../actions";
import styled from "styled-components/native";

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
    <DeckEntry onPress={() => this.navigateToDeck(item.title)}>
      <DeckTitle>{item.title}</DeckTitle>
      <DeckDescription>
        {"Contains " + item.questions.length + " cards"}
      </DeckDescription>
    </DeckEntry>
  );

  _keyExtractor = (item, index) => item.title;

  render() {
    const { decks, loading } = this.props;
    return (
      <Container>
        {loading === true ? (
          <CenterView>
            <DeckText>Please create a flashcard deck.</DeckText>
          </CenterView>
        ) : (
          <FlatList
            data={Object.values(decks)}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        )}
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.primaryBackground};
  color: white;
`;

const CenterView = styled.View`
  flex: 1;
  background-color: ${Colors.primaryBackground};
  align-items: center;
  justify-content: center;
  font-size: 75px;
`;

const DeckTitle = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: white;
  text-align: center;
  margin: 10px;
`;

const DeckDescription = styled.Text`
  font-size: 20px;
  color: white;
  text-align: center;
`;

const DeckText = styled.Text`
  font-size: 50px;
  color: ${Colors.primary};
  text-align: center;
`;

const DeckEntry = styled.TouchableOpacity`
  background-color: ${Colors.primary};
  margin: 20px;
  padding: 20px;
  border-radius: 10;
  align-items: center;
  justify-content: center;
`;

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
