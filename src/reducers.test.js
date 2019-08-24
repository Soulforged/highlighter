import {
  setHighlightColor,
  addSelectedHighlightOption,
  removeSelectedHighlightOption,
  addHighlight
} from "./actions";
import rootReducer from "./reducers";

describe("reducer tests", () => {
  const initialState = {
    selectedHighlightOptions: [],
    highlights: [],
    filteredHighlights: []
  };

  it("sets current highlight color", () => {
    const newState = rootReducer(initialState, setHighlightColor("red"));
    expect(newState.highlightColor).toEqual("red");
  });

  it("changes current highlight color", () => {
    const newState = rootReducer(
      { ...initialState, highlightColor: "red" },
      setHighlightColor("yellow")
    );
    expect(newState.highlightColor).toEqual("yellow");
  });

  it("adds the highlight color selected to the selected list", () => {
    const newState = rootReducer(
      { ...initialState, selectedHighlightOptions: ["red"] },
      addSelectedHighlightOption("yellow")
    );
    expect(newState.selectedHighlightOptions).toEqual(["red","yellow"]);
  });

  it("adds the highlight color selected to the selected list", () => {
    const newState = rootReducer(
      { ...initialState, selectedHighlightOptions: ["red", "yellow"] },
      removeSelectedHighlightOption("red")
    );
    expect(newState.selectedHighlightOptions).toEqual(["yellow"]);
  });

  it("adds highlights and filter them automatically for activated filters", () => {
    const highlight = {
      text: "some text",
      x: 0,
      y: 1,
      width: 200,
      color: "red"
    };
    const highlight1 = {
      text: "some text",
      x: 0,
      y: 1,
      width: 200,
      color: "yellow"
    };
    const intermediateState = rootReducer(
      { ...initialState, selectedHighlightOptions: ["red"] },
      addHighlight(highlight)
    );
    const newState = rootReducer(intermediateState, addHighlight(highlight1));
    expect(newState.highlights).toEqual([highlight,highlight1]);
    expect(newState.filteredHighlights).toEqual([highlight]);
  });

  it("sets filter and filters highlights automatically", () => {
    const redHighlight = {
      text: "some text",
      x: 0,
      y: 1,
      width: 200,
      color: "red"
    };
    const greenHighlights = [
      {
        text: "some text",
        x: 0,
        y: 1,
        width: 200,
        color: "green"
      },
      {
        text: "some text",
        x: 0,
        y: 1,
        width: 200,
        color: "green"
      }
    ];
    const existingHighlights = [redHighlight,{
      text: "some text",
      x: 0,
      y: 1,
      width: 200,
      color: "yellow"
    }, ...greenHighlights];
    const onlyRedsState = rootReducer(
      { ...initialState, highlights: existingHighlights },
      addSelectedHighlightOption("red")
    );
    expect(onlyRedsState.filteredHighlights).toEqual([redHighlight]);
    const redsAndGreensState = rootReducer(
      onlyRedsState,
      addSelectedHighlightOption("green")
    );
    expect(redsAndGreensState.filteredHighlights).toEqual([redHighlight, ...greenHighlights]);
    const noRedsState = rootReducer(redsAndGreensState, removeSelectedHighlightOption("red"));
    expect(noRedsState.filteredHighlights).toEqual(greenHighlights);
    const noFilterState = rootReducer(noRedsState, removeSelectedHighlightOption("green"));
    expect(noFilterState.filteredHighlights).toEqual([]);
  });
});
