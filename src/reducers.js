import { combineReducers } from "redux";
import {
  SET_HIGHLIGHT_COLOR,
  SET_TEXT
} from "./actions";
import highlights from "./highlightsReducer";

const highlightColor = (state = "red", action) => {
  switch(action.type) {
    case SET_HIGHLIGHT_COLOR: return action.color;
    default: return state;
  }
};

const text = (state = "", action) => {
  switch(action.type) {
    case SET_TEXT: return action.text;
    default: return state;
  }
};

export default combineReducers({
  highlightColor,
  highlights,
  text
});
