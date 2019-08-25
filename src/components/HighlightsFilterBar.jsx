//@flow
import React from "react";
import HighlightOption from "./HighlightOption";
import { HIGHLIGHTER_COLORS } from "../config";

export default ({
  filter,
  removeSelectedHighlightOption,
  addSelectedHighlightOption
}) => (
  <div style={{ flexDirection: "row", padding: 10 }}>
    {HIGHLIGHTER_COLORS.map(color => (
      <HighlightOption
        key={color}
        onSelected={() => {
          if (filter.indexOf(color) !== -1) {
            removeSelectedHighlightOption(color);
          } else {
            addSelectedHighlightOption(color);
          }
        }}
        color={color}
        selected={filter.indexOf(color) !== -1}
      />
    ))}
  </div>
);
