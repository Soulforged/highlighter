import React from 'react';
import './App.css';
import { Provider } from "react-redux";
import {
  HighlightSelectorBar,
  HighlightableTextArea,
  HighlightsFilterBar,
  ActivatedHighlights
} from "./containers";
import createStore from "./createStore";

function App() {
  const store = createStore();
  return (
    <Provider store={store}>
      <div className="App">
        <HighlightSelectorBar />
        <HighlightableTextArea width={500} height={100} />
        <HighlightsFilterBar />
        <ActivatedHighlights />
      </div>
    </Provider>
  );
}

export default App;
