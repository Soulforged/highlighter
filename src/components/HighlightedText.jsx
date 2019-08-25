import React from "react";

/**
* Represents a highlighted fragment from the original text.
* This is shown back to the user as per his selected color filters.
*
* @param { string } color - any valid color string @see config#HIGHLIGHTER_COLORS
* @param { number } width - the fixed width of this highlight
* @param { string } text - the highlighted text
**/
export default ({ color, width, text }) => (
  <span style={{ backgroundColor: color, width }}>
    {text}
  </span>
);
