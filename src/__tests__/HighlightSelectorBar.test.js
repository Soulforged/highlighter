import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import {
  HighlightSelectorBar
} from '../components';

describe("highlight selector bar tests", () => {

  afterEach(cleanup);

  it("attempts to change selected color on option selected", () => {
    const setHighlightColor = jest.fn();
    const { container, getByTestId } = render((
      <HighlightSelectorBar
        highlightColor="red"
        setHighlightColor={setHighlightColor}
      />
    ));
    const newOption = getByTestId("yellow");
    fireEvent.click(newOption);
    expect(setHighlightColor).toHaveBeenCalledWith("yellow");
    expect(container).toMatchSnapshot();
  });
});
