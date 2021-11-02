**The live version of the app can be found at: https://eloquent-ritchie-a586f7.netlify.app/**

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
The graphs were built using [victory](https://formidable.com/open-source/victory/)

Since it's a small project that doesn't have a complex data flow, it isn't using any state management lib.\
Instead, it's leveraging `useReducer` and the [react context api](https://reactjs.org/docs/context.html) to handle data flow and management.

## How to run

`npm start` runs the app in the development mode with hot reload.

## How to build  for production

`npm run build` builds the app for production to the `build` folder.

## Folders
### components

This folder has all the basic components used to render the graphs and the pages

### providers

This folder has the code that is responsible for passing data through the component three.\
It uses the [react context api](https://reactjs.org/docs/context.html) which allows us to pass data to components without \
having to pass props down manually.

### store

This folder has the code for the app's store.\
It has the app's reducers, actions, and state. I'm using a custom hook, `useStore`, to expose the actions and the state. \
The exposed items are later used by the app's provider to pass them to the components.

### types

This folder has all the common typescript types used in the app.

### utils

This folder has all the functions that helps the visual components to get and manipulate data as needed.

## TODOs
[ ] improve mobile support

[ ] move the dataset to a CDN

[ ] add loading state
