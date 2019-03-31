# Mobile Flashcards

This project is a simple mobile flashcard app.  
Built using React Native and Redux with [Expo](https://expo.io/), it was developed as a project for the [Udacity React Nanodegree Program](https://www.udacity.com/course/react-nanodegree--nd019).

Users can add and remove decks to which any number of cards containing questions and answers can be added.  
After adding cards to a deck a quiz can be taken.

Note: This app has only been tested for Android devices.

## Table of Contents

- [Demo](#demo)
- [Installation](#running-the-application)
- [Create React Native App and Expo](#create-react-native-app-and-expo)

## Demo
You can test the app online [here](https://appetize.io/embed/p9br5mj94vy278rnxdjyu6fu90?device=nexus5&scale=75&orientation=portrait&osVersion=8.1).  

To test the application on your Android device, scan the QR code below in the
[Expo app](https://play.google.com/store/apps/details?id=host.exp.exponent).  
Alernatively you can install [mobile-flashcards-signed.apk](../build/mobile-flashcards-signed.apk).

<div style="text-align:center"><img src ="qr-expo-android.png" alt="Expo Android QR code" title="Expo Android QR code" /></div>

## Running the application

Make sure to have [Node.js](https://nodejs.org/en/) installed.  
To be able to preview the app install the Expo app on your [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://itunes.apple.com/app/apple-store/id982107779) device.  
Clone the project, install the dependencies and run the development server:

```
git clone https://github.com/laudep/mobile-flashcards.git
yarn install
yarn start
```

A new browser window will open automatically.

## Create React Native App and Expo

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).  
You can find more
information on how to perform common tasks [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

More information on running, testing and debugging using Expo can be found in the [Expo Documentation](https://docs.expo.io/versions/latest/).
