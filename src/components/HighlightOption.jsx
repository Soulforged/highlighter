//@flow
import React from "react";

type Props = {
  color: string,
  onSelected: (string) => void,
  selected: boolean
};

export default ({ color, selected, onSelected }: Props) => (
  <button
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
