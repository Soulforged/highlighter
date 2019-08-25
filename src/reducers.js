import { combineReducers } from "redux";
import {
  SET_HIGHLIGHT_COLOR
} from "./actions";
import highlights from "./highlightsReducer";

const highlightColor = (state = "red", action) => {
  switch(action.type) {
    case SET_HIGHLIGHT_COLOR: return action.color;
    default: return state;
  }
};

export default combineReducers({
  highlightColor,
  highlights
});
