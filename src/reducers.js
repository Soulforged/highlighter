import {
  SET_HIGHLIGHT_COLOR,
  ADD_SELECTED_HIGHLIGHT_OPTION,
  REMOVE_SELECTED_HIGHLIGHT_OPTION,
  ADD_HIGHLIGHT
} from "./actions";

const highlighterColors = ["red", "yellow", "green"];

const initialState = {
  highlightColor: "red",
  selectedHighlightOptions: [],
  highlights: [],
  filteredHighlights: [],
  highlighterColors
};

export default (state = initialState, action) => {
  const { highlights, selectedHighlightOptions, filteredHighlights } = state;
  switch(action.type) {
    case SET_HIGHLIGHT_COLOR: return ({ ...state, highlightColor: action.color });
    case ADD_SELECTED_HIGHLIGHT_OPTION: {
      const newFilteredHighlights = highlights
        .filter(highlight => highlight.color === action.color);
      return {
        ...state,
        selectedHighlightOptions: [...selectedHighlightOptions, action.color],
        filteredHighlights: [...filteredHighlights, ...newFilteredHighlights]
      }
    };
    case REMOVE_SELECTED_HIGHLIGHT_OPTION: return {
      ...state,
      selectedHighlightOptions: selectedHighlightOptions.filter(c => c !== action.color),
      filteredHighlights: filteredHighlights.filter(({ color }) => color !== action.color)
    };
    case ADD_HIGHLIGHT: {
      const { highlight } = action;
      const newFilteredHighlights = selectedHighlightOptions.indexOf(highlight.color) !== -1 ?
        [...filteredHighlights, highlight] : filteredHighlights
      return {
        ...state,
        highlights: [...highlights, highlight],
        filteredHighlights: newFilteredHighlights
      };
    };
    default: return state;
  }
};
