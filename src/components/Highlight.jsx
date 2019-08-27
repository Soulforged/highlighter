import React from "react";


type Props = {
  //absolute x coordinate for the mark, from the left of its container
  x: number,
  //absolute y coordinate for the mark, from the top of its container
  y: number,
  //any valid color string @see config#HIGHLIGHTER_COLORS
  color: string,
  //fixed width of the mark
  width: number,
  //fixed height of the mark
  height: number,
  id: string
};

/**
* A colored highlight
*
* @param { Props } properties
**/
export default ({ x, y, color, width, height, id }: Props) => (
  <mark
    data-testid={id}
    style={{
      position: "absolute",
      left: x,
      top: y,
      backgroundColor: color,
      width,
      height
    }}
  />
);
