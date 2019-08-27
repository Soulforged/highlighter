export const SET_HIGHLIGHT_COLOR = "SET_HIGHLIGHT_COLOR";
export const ADD_SELECTED_HIGHLIGHT_OPTION = "ADD_SELECTED_HIGHLIGHT_OPTION";
export const REMOVE_SELECTED_HIGHLIGHT_OPTION = "REMOVE_SELECTED_HIGHLIGHT_OPTION";
export const ADD_HIGHLIGHT = "ADD_HIGHLIGHT";
export const CLEAR_HIGHTLIGHTS = "CLEAR_HIGHTLIGHTS";
export const SET_TEXT = "SET_TEXT";

/**
* Sets the text to be highlighted.
**/
export const setText = text => ({
  type: SET_TEXT,
  text
});

/**
* Sets the current highlight color, this is the color going to be used to create
* a highlights until it's changed for another one
**/
export const setHighlightColor = color => ({
  type: SET_HIGHLIGHT_COLOR,
  color
});

/**
* Adds a new color option as filter, filters can be accumulated using this action
**/
export const addSelectedHighlightOption = color => ({
  type: ADD_SELECTED_HIGHLIGHT_OPTION,
  color
});

/**
* Removes a color option from filters
**/
export const removeSelectedHighlightOption = color => ({
  type: REMOVE_SELECTED_HIGHLIGHT_OPTION,
  color
});

/**
* Adds a new highlight.
*
* The highlight contains information about its color and text, for later retrieval.
* It also contains dimensional information to be able to render the actual
* highlights.
**/
export const addHighlight = highlight => ({
  type: ADD_HIGHLIGHT,
  highlight
});

/**
* Clears all highlights.
**/
export const clearHighlights = () => ({ type: CLEAR_HIGHTLIGHTS });
