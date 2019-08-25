export const SET_HIGHLIGHT_COLOR = "SET_HIGHLIGHT_COLOR";
export const ADD_SELECTED_HIGHLIGHT_OPTION = "ADD_SELECTED_HIGHLIGHT_OPTION";
export const REMOVE_SELECTED_HIGHLIGHT_OPTION = "REMOVE_SELECTED_HIGHLIGHT_OPTION";
export const ADD_HIGHLIGHT = "ADD_HIGHLIGHT";
export const CLEAR_HIGHTLIGHTS = "CLEAR_HIGHTLIGHTS";

export const setHighlightColor = color => ({
  type: SET_HIGHLIGHT_COLOR,
  color
});

export const addSelectedHighlightOption = color => ({
  type: ADD_SELECTED_HIGHLIGHT_OPTION,
  color
});

export const removeSelectedHighlightOption = color => ({
  type: REMOVE_SELECTED_HIGHLIGHT_OPTION,
  color
});

export const addHighlight = highlight => ({
  type: ADD_HIGHLIGHT,
  highlight
});

export const clearHighlights = () => ({ type: CLEAR_HIGHTLIGHTS });
