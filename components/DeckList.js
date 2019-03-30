import { Alert, FlatList, Platform, TouchableOpacity } from "react-native";
import { CenterView, Container, DescriptionText, TitleText } from "./styled";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";

import Colors from "../constants/Colors";
import { Dimensions } from "react-native";
import SwipeOut from "react-native-swipeout";
import { connect } from "react-redux";
import { handleDeckDeletion } from "../actions";
import { handleInitialData } from "../actions";
import styled from "styled-components/native";

class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDeckTitle: ""
    };
  }
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
      id: id,
      title: `Deck '${id}' `
    });
  };

  onDelete = id => {
    const { deleteDeck } = this.props;
    const isEmptyDeck =
      Object.values(this.props.decks).filter(deck => deck.title === id)[0]
        .questions.length <= 0;

    isEmptyDeck
      ? deleteDeck(id)
      : // Show an alert when deleting a deck that isn't empty
        Alert.alert(
          "Alert",
          `Are you sure you want to delete deck '${id}'?`,
          [
            {
              text: "No",
              onPress: () => console.log(`Deletion of deck '${id}' cancelled.`),
              style: "cancel"
            },
            {
              text: "Yes",
              onPress: () => deleteDeck(id)
            }
          ],
          { cancelable: true }
        );
  };

  _renderItem = ({ item }) => (
    <SwipeOut
      backgroundColor="white"
      autoClose={true}
      onClose={(secId, rowId, direction) => {
        if (this.state.activeDeckTitle !== "") {
          this.setState({ activeDeckTitle: "" });
        }
      }}
      onOpen={(secId, rowId, direction) => {
        this.setState({ activeDeckTitle: item.title });
      }}
      right={[
        {
          backgroundColor: "white",
          component: (
            <SwipeButton>
              <MaterialIcons name="delete" color="white" size={40} />
            </SwipeButton>
          ),
          onPress: () => this.onDelete(this.state.activeDeckTitle)
        }
      ]}
      rowId={item.index}
    >
      <DeckEntry
        index={item.index}
        onPress={() => this.navigateToDeck(item.title)}
        minWidth={Math.round(Dimensions.get("window").width * 0.9)}
      >
        <TitleText color="white">{item.title}</TitleText>
        <DescriptionText color="white">
          {"Contains " + item.questions.length + " cards"}
        </DescriptionText>
      </DeckEntry>
    </SwipeOut>
  );

  _keyExtractor = (item, index) => item.title;

  render() {
    const { decks, loading } = this.props;

    return (
      <Container>
        {loading === true ? (
          <CenterView>
            <TitleText>Create a deck to get started.</TitleText>
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

const DeckEntry = styled.TouchableOpacity`
  min-width: ${props => (props.minWidth ? props.minWidth : 200)};
  background-color: ${Colors.primary};
  margin: 20px;
  padding: 20px;
  border-radius: 10;
  align-items: center;
  justify-content: center;
`;

const SwipeButton = styled.View`
  flex: 1;
  border-radius: 10;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${Colors.negative};
  margin-top: 20;
  margin-bottom: 20;
`;

function mapDispatchToProps(dispatch) {
  return {
    getInitialData: () => dispatch(handleInitialData()),
    deleteDeck: id => dispatch(handleDeckDeletion(id))
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
