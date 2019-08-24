//@flow
import React, { useState } from "react";
import Highlight from "./Highlight";

function getTextBoundingRect(input, selectionStart, selectionEnd, debug) {
    // If available (thus IE), use the createTextRange method
    if (typeof input.createTextRange == "function") {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveStart('character', selectionStart);
        range.moveEnd('character', selectionEnd - selectionStart);
        return range.getBoundingClientRect();
    }
    // createTextRange is not supported, create a fake text range
    let offset = getInputOffset();
    let topPos = offset.top;
    let leftPos = offset.left;
    let width = getInputCSS('width', true);
    let height = getInputCSS('height', true);

    // Styles to simulate a node in an input field
    let cssDefaultStyles = "white-space:pre;padding:0;margin:0;";
    let listOfModifiers = ['direction', 'font-family', 'font-size',
          'font-size-adjust', 'font-variant', 'font-weight', 'font-style',
          'letter-spacing', 'line-height', 'text-align', 'text-indent',
          'text-transform', 'word-wrap', 'word-spacing'];

    topPos += getInputCSS('padding-top', true);
    topPos += getInputCSS('border-top-width', true);
    leftPos += getInputCSS('padding-left', true);
    leftPos += getInputCSS('border-left-width', true);
    leftPos += 1; //Seems to be necessary

    for (var i=0; i < listOfModifiers.length; i++) {
        var property = listOfModifiers[i];
        cssDefaultStyles += property + ':' + getInputCSS(property) +';';
    }
    // End of CSS variable checks

    const text = input.value;
    const textLen = text.length;
    const fakeClone = document.createElement("div");
    if(selectionStart > 0) {
      appendPart(0, selectionStart);
    }
    var fakeRange = appendPart(selectionStart, selectionEnd);
    if(textLen > selectionEnd) {
      appendPart(selectionEnd, textLen);
    }

    // Styles to inherit the font styles of the element
    fakeClone.style.cssText = cssDefaultStyles;

    // Styles to position the text node at the desired position
    fakeClone.style.position = "absolute";
    fakeClone.style.top = topPos + "px";
    fakeClone.style.left = leftPos + "px";
    fakeClone.style.width = width + "px";
    fakeClone.style.height = height + "px";
    fakeClone.style.color = "transparent";
    fakeClone.style["z-index"] = -4;
    document.getElementById("root").appendChild(fakeClone);
    var returnValue = fakeRange.getBoundingClientRect(); //Get rect

    if (!debug) {
      fakeClone.parentNode.removeChild(fakeClone);//Remove temp
    }
    return returnValue;

    // Local functions for readability of the previous code
    function appendPart(start, end){
        var span = document.createElement("span");
        span.style.cssText = cssDefaultStyles; //Force styles to prevent unexpected results
        span.textContent = text.substring(start, end);
        fakeClone.appendChild(span);
        return span;
    }
    // Computing offset position
    function getInputOffset(){
        var body = document.body,
            win = document.defaultView,
            docElem = document.documentElement,
            box = document.createElement('div');
        box.style.paddingLeft = box.style.width = "1px";
        body.appendChild(box);
        var isBoxModel = box.offsetWidth == 2;
        body.removeChild(box);
        box = input.getBoundingClientRect();
        var clientTop  = docElem.clientTop  || body.clientTop  || 0,
            clientLeft = docElem.clientLeft || body.clientLeft || 0,
            scrollTop  = win.pageYOffset || isBoxModel && docElem.scrollTop  || body.scrollTop,
            scrollLeft = win.pageXOffset || isBoxModel && docElem.scrollLeft || body.scrollLeft;
        return {
            top : box.top  + scrollTop  - clientTop,
            left: box.left + scrollLeft - clientLeft};
    }
    function getInputCSS(prop, isnumber){
        var val = document.defaultView.getComputedStyle(input, null).getPropertyValue(prop);
        return isnumber ? parseFloat(val) : val;
    }
}

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

export default ({
  highlights = [],
  addHighlight,
  highlightColor,
  width = 500,
  height = 100
}) => {
  const [selectionStartX,setSelectionStartX] = useState(0);
  const calculateAndAddHighlight = ({ target, nativeEvent }) => {
    const { selectionStart, selectionEnd } = target;
    // getTextBoundingRect(target, selectionStart, selectionEnd, true);
    // const { offsetX, offsetY } = nativeEvent;
    const highlight = target.value.substring(selectionStart, selectionEnd);
    // console.log(selectionStartX, selectionEnd, highlight, offsetX);
    // if (highlight && offsetX !== undefined && offsetY !== undefined){
    if (highlight){
      const rect = getTextBoundingRect(target, selectionStart, selectionEnd, true)
      // const width = offsetX - selectionStartX;
      const id = `${highlightColor}_${rect.x}_${rect.y}`;
      addHighlight({
        text: highlight,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        color: highlightColor,
        id
      });
    }
  };
  return (
    <div style={{ position: "relative" }}>
      <div style={{
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
        padding: 3
      }}>
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
        onMouseDown={({ nativeEvent: { offsetX } }) => setSelectionStartX(offsetX)}
        onSelect={calculateAndAddHighlight}
      />
    </div>
  );
}
