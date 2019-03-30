import {
  ADD_CARD,
  ADD_DECK,
  DELETE_DECK,
  GET_DECK,
  RECEIVE_DECKS
} from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case GET_DECK:
      return state[action.id];
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      };
    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions.concat([action.card])
        }
      };
    case DELETE_DECK:
      const { [action.title]: deleteDeck, ...newDecks } = state;
      return newDecks;
    default:
      return state;
  }
}

export default decks;
