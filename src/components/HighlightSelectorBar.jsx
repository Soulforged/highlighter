//@flow
import React from "react";
import HighlightOption from "./HighlightOption";
import { HIGHLIGHTER_COLORS } from "../config";

export default ({ setHighlightColor, highlightColor }) => (
  <div style={{ flexDirection: "row", padding: 10 }}>
    {HIGHLIGHTER_COLORS.map(color => (
      <HighlightOption
        key={color}
        onSelected={() => setHighlightColor(color)}
        color={color}
        selected={highlightColor === color}
      />
    ))}
  </div>
);
