export let testData = {
  ReactNative: {
    title: "React Native",
    questions: [{
        question: "What is React Native?",
        answer: "A framework for building native apps using React."
      },
      {
        question: "Which React Native component can be considered the equivalent to HTML's <div> tag?",
        answer: "The <View> component."
      },
      {
        question: "What is React Native's version of localStorage?",
        answer: "AsyncStorage"
      }
    ]
  },
  Redux: {
    title: "Redux",
    questions: [{
        question: "What is the main benefit of using Thunks?",
        answer: "Out of the box, the Redux store can only support the synchronous flow of data. Middleware like thunk helps support asynchronicity in a Redux application."
      },
      {
        question: "What functionality does the Prodider component defined by the react-redux package offer?",
        answer: "Provider makes it possible for Redux to pass data from the store to any React components that need it. It uses React’s context feature to make this work."
      }
    ]
  }
};