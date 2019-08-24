//@flow
import React from "react";

type Props = {
  x: number,
  y: number,
  width: number,
  color: string
}

export default ({ x, y, color, width, id }: Props) => (
  <mark
    data-testid={id}
    style={{
      position: "absolute",
      left: x + 1,
      top: y - 6,
      backgroundColor: color,
      color: "transparent",
      width: width,
      height: "1.1em"
    }}
  />
);
