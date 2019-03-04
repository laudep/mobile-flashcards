import { AsyncStorage } from "react-native";
import _ from "lodash";

const STORAGE_KEY = "MobileFlashcards:decks";

export function getId(navigation) {
  let id = "No id found.";
  try {
    id = navigation.getParam("id", id);
  } catch (error) {
    console.warn("Error while determining id: ", error);
  }
  return id;
}

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
      newDeck = {
        [title]: {
          title: title,
          questions: []
        }
      };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...decks, ...newDeck }));
  });
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(STORAGE_KEY).then(data => {
    let decks = JSON.parse(data);
    decks[title] = {
      ...decks[title],
      questions: decks[title].questions.concat([card])
    };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
  });
}
