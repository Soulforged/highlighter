import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  waitForDomChange,
  wait,
  prettyDOM
} from "@testing-library/react";
import {
  HighlightableTextArea,
  HighlightsFilterBar
} from '../components';

describe("component tests", () => {
  const highlights = [{
    text: "some text",
    x: 0,
    y: 1,
    width: 200,
    color: "red",
    id: "0_1",
    key: "0_1"
  }];

  it("renders highlights when text gets selected in the a HighlightableTextArea", () => {
    const { container, getByTestId } = render((
      <HighlightableTextArea highlights={highlights} clearHighlights={jest.fn()} />
    ));
    const mark = getByTestId("0_1");
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
    fireEvent.select(textArea, {
      target: { selectionStart: 3, selectionEnd: 8 }
    })
    expect(addHighlightMock).toHaveBeenCalledWith({
      "color": "red",
      "id": "0_1",
      "end": 8,
      "height": 13,
      "id": "3_8",
      "start": 3,
      "text": "em ip",
      "width": 100,
      "x": 1,
      "y": 1
    });
  });

  it("renders filters with selections", () => {
    const { container, getByTestId } = render(<HighlightsFilterBar filter={["yellow"]} />);
    const selectedOption = getByTestId("yellow");
    const notSelectedOption = getByTestId("red");
    expect(selectedOption.style.border).toEqual("3px solid blue");
    expect(notSelectedOption.style.border).toEqual("3px solid black");
    expect(container).toMatchSnapshot();
  });

  it("toggles filter selection on filter option click", () => {
    const removeSelectedHighlightOption = jest.fn();
    const addSelectedHighlightOption = jest.fn();
    const { getByTestId } = render((
      <HighlightsFilterBar
        filter={["yellow"]}
        removeSelectedHighlightOption={removeSelectedHighlightOption}
        addSelectedHighlightOption={addSelectedHighlightOption}
      />
    ));
    const selectedOption = getByTestId("yellow");
    const notSelectedOption = getByTestId("red");
    fireEvent.click(selectedOption);
    expect(removeSelectedHighlightOption).toHaveBeenCalled();
    expect(addSelectedHighlightOption).not.toHaveBeenCalled();
    fireEvent.click(notSelectedOption);
    expect(addSelectedHighlightOption).toHaveBeenCalled();
  });
});
