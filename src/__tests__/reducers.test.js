import {
  setHighlightColor,
  addSelectedHighlightOption,
  removeSelectedHighlightOption,
  addHighlight,
  clearHighlights
} from "../actions";
import rootReducer from "../reducers";

describe("reducer tests", () => {
  const initialState = {
    highlights: { filter: [], ids: [], byId: {}, filteredIds: [] }
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
      {
        ...initialState,
        highlights: { ...initialState.highlights, filter: ["red"] }
      },
      addSelectedHighlightOption("yellow")
    );
    expect(newState.highlights.filter).toEqual(["red","yellow"]);
  });

  it("adds the highlight color selected to the selected list", () => {
    const newState = rootReducer(
      {
        ...initialState,
        highlights: { ...initialState.highlights, filter: ["red", "yellow"] }
      },
      removeSelectedHighlightOption("red")
    );
    expect(newState.highlights.filter).toEqual(["yellow"]);
  });

  it("resets highlights and filtered highlights on clear", () => {
    const newState = rootReducer(
      {
        ...initialState,
        highlights: {
          ids: ["1"],
          filteredIds: ["1"],
          byId: { "1": { id: "1" } },
          filter: ["red", "yellow"]
        }
      },
      clearHighlights()
    );
    expect(newState.highlights).toEqual({
      ...initialState.highlights,
      filter: ["red","yellow"]
    });
  });

  it("adds highlights and filter them automatically for activated filters", () => {
    const highlight = {
      text: "some text",
      x: 0,
      y: 1,
      width: 200,
      color: "red",
      id: "2"
    };
    const highlight1 = {
      text: "some text",
      x: 0,
      y: 1,
      width: 200,
      color: "yellow",
      id: "1"
    };
    const intermediateState = rootReducer(
      {
        ...initialState,
        highlights: { ...initialState.highlights, filter: ["red"] }
      },
      addHighlight(highlight)
    );
    const newState = rootReducer(intermediateState, addHighlight(highlight1));
    expect(newState.highlights.ids).toEqual([highlight.id,highlight1.id]);
    expect(newState.highlights.byId[highlight.id]).toEqual(highlight);
    expect(newState.highlights.byId[highlight1.id]).toEqual(highlight1);
    expect(newState.highlights.filteredIds).toEqual([highlight.id]);
  });

  it("sets filter and filters highlights automatically", () => {
    const redHighlight = {
      text: "some text",
      x: 0,
      y: 1,
      width: 200,
      color: "red",
      id: "1"
    };
    const greenHighlights = [
      {
        text: "some text",
        x: 0,
        y: 1,
        width: 200,
        color: "green",
        id: "2"
      },
      {
        text: "some text",
        x: 0,
        y: 1,
        width: 200,
        color: "green",
        id: "3"
      }
    ];
    const existingHighlights = [redHighlight,{
      text: "some text",
      x: 0,
      y: 1,
      width: 200,
      color: "yellow",
      id: "4"
    }, ...greenHighlights];
    const onlyRedsState = rootReducer(
      { ...initialState,
        highlights: {
          ...initialState.highlights,
          ids: existingHighlights.map(({ id }) => id),
          byId: existingHighlights.reduce(
            (acc, { id, ...rest }) => ({ ...acc, [id]: rest }),
            {}
          )
        }
      },
      addSelectedHighlightOption("red")
    );
    expect(onlyRedsState.highlights.filteredIds).toEqual([redHighlight.id]);
    const redsAndGreensState = rootReducer(
      onlyRedsState,
      addSelectedHighlightOption("green")
    );
    expect(redsAndGreensState.highlights.filteredIds).toEqual([
      redHighlight.id,
      ...greenHighlights.map(({ id }) => id)
    ]);
    const noRedsState = rootReducer(redsAndGreensState, removeSelectedHighlightOption("red"));
    expect(noRedsState.highlights.filteredIds).toEqual(greenHighlights.map(({ id }) => id));
    const noFilterState = rootReducer(noRedsState, removeSelectedHighlightOption("green"));
    expect(noFilterState.highlights.filteredIds).toEqual([]);
  });
});
