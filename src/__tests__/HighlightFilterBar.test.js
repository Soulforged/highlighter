import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import {
  HighlightsFilterBar
} from '../components';

describe("highlight filter bar tests", () => {

  afterEach(cleanup);

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
