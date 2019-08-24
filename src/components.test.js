import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  waitForDomChange,
  wait
} from "@testing-library/react";
import { HighlightableTextArea } from './components';

describe("component tests", () => {
  const highlights = [{
    text: "some text",
    x: 0,
    y: 1,
    width: 200,
    color: "red",
    id: "red_0_1",
    key: "red_0_1"
  }];

  it("renders highlights when text gets selected in the a HighlightableTextArea", () => {
    const { container, getByTestId } = render((
      <HighlightableTextArea highlights={highlights} />
    ));
    const mark = getByTestId("red_0_1");
    expect(mark).not.toBe(null);
    expect(container).toMatchSnapshot();
  });

  it("allows to add new highlights by selecting text over HighlightableTextArea", () => {
    const addHighlightMock = jest.fn();
    const { getByTestId } = render((
      <HighlightableTextArea
        addHighlight={addHighlightMock}
        highlightColor="red"
      />
    ));
    const textArea = getByTestId("highlightableTxtArea");
    fireEvent.change(textArea, { target: { value: "Lorem ipsum dolor" } });
    fireEvent.mouseDown(textArea, { nativeEvent: { offsetX: 2 } });
    fireEvent.select(textArea, {
      target: { selectionStart: 3, selectionEnd: 8 },
      nativeEvent: { offsetX: 3, offsetY: 2 }
    })
    expect(addHighlightMock).toHaveBeenCalledWith({
      text: "em ipsum ",
      x: 3,
      y: 8,
      width: 200,
      color: "red",
      id: "red_0_1"
    });
  });
});
