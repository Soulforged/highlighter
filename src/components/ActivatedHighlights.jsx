//@flow
import React from "react";
import HighlightedText from "./HighlightedText";

const renderActivatedHighlights = filteredHighlights => (
  filteredHighlights.map(({ text, width, color, id }) =>
    <HighlightedText key={id} text={text} width={width} color={color} />
  )
);

export default ({ filteredHighlights }) => (
  <div style={{
    overflow: "auto",
    width: 500,
    height: 100,
    padding: 3,
    border: "1px solid black"
  }}>
    {renderActivatedHighlights(filteredHighlights)}
  </div>
);
