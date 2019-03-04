import { getDecks, saveDeckTitle, addCardToDeck } from "../utils/helpers";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const GET_DECK = "GET_DECK";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export function handleInitialData() {
  return dispatch => {
    return getDecks().then(decks => {
      dispatch(receiveDecks(decks));
    });
  };
}

function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function getDeck(id) {
  return {
    type: GET_DECK,
    id
  };
}

export function handleNewDeck(title) {
  return dispatch => {
    return saveDeckTitle(title).then(() => {
      dispatch(addDeck(title));
    });
  };
}

function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  };
}

export function handleNewCard(title, card) {
  return dispatch => {
    return addCardToDeck(title, card).then(() => {
      dispatch(addCard(title, card));
    });
  };
}

function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card
  };
}
