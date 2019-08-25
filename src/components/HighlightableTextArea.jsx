//@flow
import React, { useState, useRef } from "react";
import Highlight from "./Highlight";

type Props = {
  // A list of highlights to render, defaults to empty list
  highlights: [Object],
  // A callback that should clear the highlights when the text changes
  clearHighlights: () => void,
  /*
    A fixed width for the container, to keep the container and the textarea
    dimensions in sync, defaults to 500
  */
  width: number,
  /*
    A fixed height for the container, to keep the container and the textarea
    dimensions in sync, defaults to 100
  */
  height: number,

};

const renderHighlights = highlights => (
  highlights.map(({ x, y, width, height, color, id }) => (
    <Highlight
      key={id}
      width={width}
      height={height}
      x={x}
      y={y}
      color={color}
      id={id}
    />
  ))
);

/**
* Creates a shadow version of the selection to compute the mark bouding rectangle.
*
* At this point no browser I tested supports returning selections inside a 'textarea', so to
* workaround this a range is created and added programatically to the shadow
* container so a bounding rect can be obtained out of it, since the range's
* position will be a mirror of the actual highlight's desired position and dimensions
* these attributes for the rendered highlight can be obtained safely from this
* range's bounding rect.
*
* The 'top' and 'left' attributes for the resulting rectangle are adjusted to
* consider the offsets of the shadow container.
*
* @param { Element } shadowContainer - the reference to shadow container
* @param { number } start - start of the range, related to the selection start
* @param { number } end - end of the range, related to the selection end
* @return { Object } an object containing top, left, width and height for a mark
**/
const createMarkRectangle = (shadowContainer, start, end) => {
  const range = document.createRange();
  const { top: offsetTop, left: offsetLeft } = shadowContainer.getBoundingClientRect();
  const shadowTextNode = shadowContainer.firstChild;
  range.setStart(shadowTextNode, start);
  range.setEnd(shadowTextNode, end);
  const rect = range.getBoundingClientRect();
  const { width, height, top: relativeTop, left: relativeLeft } = rect;
  const top = relativeTop - offsetTop;
  const left = relativeLeft - offsetLeft;
  return { top, left, width, height };
}

/**
* Returns a function that creates a highlight object out of the selection,
* position and dimension information and then adds it to the highlights collection.
*
* @param { Function } addHighlight - receives the created highlight and adds it to a collection
* @param { RefObject } shadowRef - a ref to the shadow container
* @return { Function } a callback for text selection inside the textarea
**/
const createAndAddHighlight = ({ addHighlight, highlightColor }, shadowRef) => ({ target }) => {
  const { selectionStart, selectionEnd } = target;
  const id = `${selectionStart}_${selectionEnd}`;
  const highlight = target.value.substring(selectionStart, selectionEnd);
  const shadowRefHandler = shadowRef.current;
  if (highlight && shadowRefHandler){
    const { top, left, width, height } = createMarkRectangle(
      shadowRefHandler, selectionStart, selectionEnd);
    addHighlight({
      text: highlight,
      x: left,
      y: top,
      width,
      height,
      color: highlightColor,
      start: selectionStart,
      end: selectionEnd,
      id
    });
  }
};

export default ({
  highlights = [],
  clearHighlights,
  width = 500,
  height = 100,
  ...props
}: Props) => {
  const shadowRef = useRef(null);
  const [textCopy,setTextCopy] = useState("");
  const reset = ({ target: { value } }) => {
    clearHighlights();
    setTextCopy(value);
  };
  return (
    <div style={{ position: "relative" }}>
      <div
        ref={shadowRef}
        style={{
          backgroundColor: "white",
          overflow: "auto",
          position: "absolute",
          height,
          width,
          top: 0,
          left: 0,
          zIndex: -1,
          margin: 0,
          borderRadius: 0,
          padding: 3,
          color: "transparent"
        }}
      >
        {textCopy}
        {renderHighlights(highlights)}
      </div>
      <textarea
        style={{
          width,
          height,
          backgroundColor: "transparent",
          margin: 0,
          borderRadius: 0
        }}
        data-testid="highlightableTxtArea"
        onSelect={createAndAddHighlight(props, shadowRef)}
        onChange={reset}
      />
    </div>
  );
}
