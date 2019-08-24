//@flow
import React from "react";
import HighlightOption from "./HighlightOption";

export default ({ highlighterColors, setHighlightColor, highlightColor }) => (
  <div style={{ flexDirection: "row", padding: 10 }}>
    {highlighterColors.map(color => (
      <HighlightOption
        key={color}
        onSelected={() => setHighlightColor(color)}
        color={color}
        selected={highlightColor === color}
      />
    ))}
  </div>
);
