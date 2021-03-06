import React from 'react';
import './App.css';
import Calendar from './Calendar'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import main from './reducers/main'

const store = createStore(
   main, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

const App = () => {
  return (
    <Provider store={store}>
      <Calendar />
    </Provider>
  );
}

export default App
