import React from "react";

/**
* Represents a selectable color option.
*
* @param { string } color - any valid color string @see config#HIGHLIGHTER_COLORS
* @param { boolean } selected - wheter or not this option is selected or not
* @param { Function } onSelected - callback for when this option gets selected
**/
export default ({ color, selected, onSelected }) => (
  <button
    data-testid={color}
    style={{
      width: 50,
      height: 32,
      margin: 5,
      backgroundColor: color,
      border: `3px solid ${selected ? "blue" : "black" }`
    }}
    onClick={onSelected}
  />
);
