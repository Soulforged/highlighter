import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import {
  HighlightableTextArea
} from '../components';

describe("highlightable text area tests", () => {
  const highlights = [{
    text: "some text",
    color: "red",
    id: "0_1",
    key: "0_1",
    parts: [{ x: 0, y: 1, width: 200, height: 13, id: "0_1" }]
  }];

  afterEach(cleanup);

  it("renders highlights when text gets selected in the a HighlightableTextArea", () => {
    const { container, getByTestId } = render((
      <HighlightableTextArea highlights={highlights} clearHighlights={jest.fn()} />
    ));
    const mark = getByTestId("0_1_0");
    expect(mark).not.toBe(null);
    expect(container).toMatchSnapshot();
  });

  it("attempts to clearHighlights when value changes in HighlightableTextArea", () => {
    const clearHighlights = jest.fn();
    const { container, getByTestId } = render((
      <HighlightableTextArea highlights={highlights} clearHighlights={clearHighlights} />
    ));
    const textArea = getByTestId("highlightableTxtArea");
    fireEvent.change(textArea, { target: { value: "Lorem ipsum dolor" } });
    expect(clearHighlights).toHaveBeenCalled();
  });

  it("allows to add new highlights by selecting text over HighlightableTextArea", () => {
    const addHighlightMock = jest.fn();
    const { getByTestId } = render((
      <HighlightableTextArea
        addHighlight={addHighlightMock}
        highlightColor="red"
        clearHighlights={jest.fn()}
      />
    ));
    const textArea = getByTestId("highlightableTxtArea");
    fireEvent.change(textArea, { target: { value: "Lorem ipsum dolor" } });
    fireEvent.select(textArea, { target: { selectionStart: 3, selectionEnd: 8 }});
    //The DOMRectList is setup as a mock, that's why this always returns two rects
    expect(addHighlightMock).toHaveBeenCalledWith({
      color: "red",
      id: "0_1",
      end: 8,
      id: "3_8",
      start: 3,
      text: "em ip",
      parts: [
        { x: 3, y: 3, width: 100, height: 13 },
        { x: 4, y: 5, width: 101, height: 13 }
      ]
    });
  });
});
