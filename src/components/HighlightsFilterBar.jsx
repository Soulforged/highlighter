//@flow
import React from "react";
import HighlightOption from "./HighlightOption";

export default ({
  highlighterColors,
  selectedHighlightOptions,
  removeSelectedHighlightOption,
  addSelectedHighlightOption
}) => (
  <div style={{ flexDirection: "row", padding: 10 }}>
    {highlighterColors.map(color => (
      <HighlightOption
        key={color}
        onSelected={() => {
          if (selectedHighlightOptions.indexOf(color) !== -1) {
            removeSelectedHighlightOption(color);
          } else {
            addSelectedHighlightOption(color);
          }
        }}
        color={color}
        selected={selectedHighlightOptions.indexOf(color) !== -1}
      />
    ))}
  </div>
);
