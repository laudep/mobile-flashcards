import { Alert, AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

import _ from "lodash";

const STORAGE_KEY = "MobileFlashcards:decks";
const NOTIFICATION_KEY = "MobileFlashcards:notifications";
let alertShown = false;

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

export function clearNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Take quiz",
    body: "👋 don't forget to practice with Mobile Flashcards today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: "day"
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              console.log("Notification set for " + tomorrow.toString());
            } else {
              console.log("Status for notification permission !== 'granted'");
              showAlert();
            }
          })
          .catch(() => {
            showAlert();
          });
      }
    });
}
export function deleteDeck(title) {
  return AsyncStorage.getItem(STORAGE_KEY).then(data => {
    const { [title]: deleteDeck, ...newDecks } = JSON.parse(data);

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDecks));
    return newDecks;
  });
}

function showAlert() {
  Alert.alert(
    "No permission for displaying notifications.",
    "Please allow notifications in Settings.",
    [{ text: "OK" }],
    { cancelable: false }
  );
  alertShown = true;
}
