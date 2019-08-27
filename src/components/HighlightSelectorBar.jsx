//@flow
import React from "react";
import HighlightOption from "./HighlightOption";
import { HIGHLIGHTER_COLORS } from "../config";

export default ({ setHighlightColor, highlightColor, clearHighlights }) => (
  <div style={{ flexDirection: "row", padding: 10, display: "flex" }}>
    {HIGHLIGHTER_COLORS.map(color => (
      <HighlightOption
        key={color}
        onSelected={() => setHighlightColor(color)}
        color={color}
        selected={highlightColor === color}
      />
    ))}
    <button
      data-testid="clearHighlightsBtn"
      type="button"
      title="clear"
      onClick={clearHighlights}
      style={{
        width: 50,
        height: 32,
        margin: 5,
        backgroundColor: "lightgray",
        border: "3px solid lightgray"
      }}
    >
    Clear
    </button>
  </div>
);
