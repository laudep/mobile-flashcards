import { AsyncStorage } from "react-native";
import _ from "lodash";
import { testData } from "./testData";

const STORAGE_KEY = "MobileFlashcards:decks";

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY).then(data => {
    return JSON.parse(data);
  });
}

export function getDeck(id) {
  return AsyncStorage.getItem(STORAGE_KEY).then(data => {
    return _.get(JSON.parse(data), id);
  });
}

export function saveDeckTitle(title) {
  return AsyncStorage.getItem(STORAGE_KEY).then(data => {
    const decks = JSON.parse(data),
      newDeck = { title: title };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...decks, ...newDeck }));
  });
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(STORAGE_KEY).then(data => {
    let decks = JSON.parse(data);
    decks[title] = { ...decks[title], questions: card };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  });
}
