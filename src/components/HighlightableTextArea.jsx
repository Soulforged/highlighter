//@flow
import React, { useState, useRef, useLayoutEffect } from "react";
import Highlight from "./Highlight";

type Props = {
  // A list of highlights to render, defaults to empty list
  highlights: [Object],
  // A callback that should clear the highlights when the text changes
  clearHighlights: () => void,
  style: [Object]
};

/**
* Some styles have to be the same for the shadow container and the textarea so
* one acts as the exact background of the other. Most of this styles are taken
* care during the useLayoutEffect callback, but on some browsers, i.e. Firefox,
* the cssText property of the textarea node is missing critical styles, like font
* for example
**/
const sharedStyles = {
  width: 500,
  height: 100,
  whiteSpace: "pre-wrap",
  padding: 2,
  border: "1px solid rgb(169, 169, 169)",
  font: "inherit",
};

const shadowContainerStyles = {
  "background-color": "white",
  overflow: "auto",
  position: "absolute",
  top: 0,
  left: 0,
  "z-index": -1,
  color: "transparent"
};

/**
* A textarea that supports custom selections and being notified on those selections
* via the 'addHighlight' callback
*
* @param { Props } properties @see #Props
**/
export default ({
  highlights = [],
  clearHighlights,
  style,
  ...props
}: Props) => {
  const shadowRef = useRef(null);
  const textRef = useRef(null);
  const [textCopy,setTextCopy] = useState("");
  const reset = ({ target: { value } }) => {
    clearHighlights();
    setTextCopy(value);
  };
  useLayoutEffect(() => {
    if (textRef.current && shadowRef.current) {
      const style = textRef.current.style;
      const cssText = Object.keys(shadowContainerStyles).reduce((acc, key) => (
        `${acc};${key}:${shadowContainerStyles[key]}`
      ), style.cssText);
      shadowRef.current.style.cssText = cssText;
    }
  });
  return (
    <div style={{ position: "relative" }}>
      <div
        ref={shadowRef}
        style={{ ...sharedStyles, ...style }}
      >
        <span>{textCopy}</span>
        {renderHighlights(highlights)}
      </div>
      <textarea
        ref={textRef}
        style={{
          ...sharedStyles,
          backgroundColor: "transparent",
          resize: "none",
          ...style
        }}
        data-testid="highlightableTxtArea"
        onSelect={createAndAddHighlight(props, shadowRef)}
        onChange={reset}
        onScroll={({ target: { scrollTop, scrollLeft } }) =>
          shadowRef.current.scrollTo(scrollLeft, scrollTop)}
      />
    </div>
  );
}

const renderHighlights = highlights => {
  return highlights.reduce((acc, { color, id, parts }) => (
    [...acc, ...parts.map(({ x, y, width, height }, index) => (
      <Highlight
        key={`${id}_${index}`}
        width={width}
        height={height}
        x={x}
        y={y}
        color={color}
        id={`${id}_${index}`}
      />
    ))]
  ), []);
};

/**
* Creates a shadow version of the selection to compute the mark bouding rectangle.
*
* At this point no browser I tested supports returning selections inside a 'textarea', so to
* workaround this a range is created and added programatically to the shadow
* container so bounding rectangles can be obtained out of it, since the range's
* position will be a mirror of the actual highlight's desired position and dimensions
* these attributes for the rendered highlight can be obtained safely from this
* range's bounding rectangles.
*
* The 'top' and 'left' attributes for the resulting rectangle are adjusted to
* consider the offsets of the text wrappr and the padding of the shadow container.
*
* @param { Element } shadowContainer - the reference to shadow container
* @param { number } start - start of the range, related to the selection start
* @param { number } end - end of the range, related to the selection end
* @return { Object } an object containing top, left, width and height for a mark
**/
const createMarkParts = (shadowContainer, start, end) => {
  const range = document.createRange();
  const shadowTextNodeWrapper = shadowContainer.firstChild;
  const shadowTextNode = shadowTextNodeWrapper.firstChild;
  const style = getComputedStyle(shadowContainer);
  const paddingTopPx = style.getPropertyValue("padding-top");
  const paddingLeftPx = style.getPropertyValue("padding-left");
  const paddingTop = parseInt(paddingTopPx, 10);
  const paddingLeft = parseInt(paddingLeftPx, 10);
  const { top: offsetTop, left: offsetLeft } = shadowTextNodeWrapper.getBoundingClientRect();
  range.setStart(shadowTextNode, start);
  range.setEnd(shadowTextNode, end);
  const allRectsInRange = range.getClientRects();
  const rectsArray = [];
  for(let i = 0; i < allRectsInRange.length; i++){
    const { x, y, width, height } = allRectsInRange.item(i);
    rectsArray.push({
      x: x - offsetLeft + paddingLeft,
      y: y - offsetTop + paddingTop,
      width,
      height
    });
  }
  return rectsArray;
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
    const parts = createMarkParts(shadowRefHandler, selectionStart, selectionEnd);
    addHighlight({
      text: highlight,
      color: highlightColor,
      start: selectionStart,
      end: selectionEnd,
      parts,
      id
    });
  }
};
