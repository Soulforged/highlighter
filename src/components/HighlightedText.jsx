//@flow
import React from "react";

type Props = {
  width: number,
  color: string,
  text: string
}

export default ({ color, width, text }: Props) => (
  <p
    style={{
      backgroundColor: color,
      width: width
    }}
  >
    {text}
  </p>
);
