import {
  setHighlightColor,
  addSelectedHighlightOption,
  removeSelectedHighlightOption,
  addHighlight,
  setText,
  clearHighlights
} from "../actions";
import rootReducer from "../reducers";

describe("reducer tests", () => {
  const initialState = {
    highlights: { filter: [], ids: [], byId: {}, filteredIds: [] }
  };

  it("sets the text", () => {
    const newState = rootReducer(initialState, setText("a new text"));
    expect(newState.text).toEqual("a new text");
  });

  it("clears all highlights", () => {
    const newState = rootReducer(
      {
        ...initialState,
        highlights: {
          ids: ["1", "2"],
          byId: { "1": {}, "2": {} },
          filteredIds: ["1"]
        }
      },
      clearHighlights()
    );
    expect(newState.highlights.ids).toEqual([]);
    expect(newState.highlights.byId).toEqual({});
    expect(newState.highlights.filteredIds).toEqual([]);
  });

  it("only removes highlights that do not inersect with new text", () => {
    const newState = rootReducer(
      {
        ...initialState,
        text: "abbc",
        highlights: {
          filteredIds: ["2"],
          filter: [],
          ids: ["1","2"],
          byId: {
            "1": { start: 0, end: 2, text: "ab" },
            "2": { start: 2, end: 4, text: "bc" }
          }
        }
      },
      setText("abb")
    );
    expect(newState.text).toEqual("abb");
    expect(newState.highlights.ids).toEqual(["1"]);
    expect(newState.highlights.byId["2"]).toBe(undefined);
    expect(newState.highlights.filteredIds).toEqual([]);
  });

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
      width: 200,
      color: "red",
      id: "1",
      start: 3,
    };
    const greenHighlights = [
      {
        text: "some text",
        width: 200,
        color: "green",
        id: "2",
        start: 1,
      },
      {
        text: "some text",
        width: 200,
        color: "green",
        id: "3",
        start: 2
      }
    ];
    const existingHighlights = [redHighlight,{
      text: "some text",
      width: 200,
      color: "yellow",
      id: "4",
      start: 5
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
      ...greenHighlights.map(({ id }) => id),
      redHighlight.id
    ]);
    const noRedsState = rootReducer(redsAndGreensState, removeSelectedHighlightOption("red"));
    expect(noRedsState.highlights.filteredIds).toEqual(greenHighlights.map(({ id }) => id));
    const noFilterState = rootReducer(noRedsState, removeSelectedHighlightOption("green"));
    expect(noFilterState.highlights.filteredIds).toEqual([]);
  });

  it("does not add a highlight that matches the exact range of an existing highlight", () => {
    const highlight = {
      text: "some text",
      x: 0,
      y: 1,
      width: 200,
      color: "red",
      id: "2"
    };
    const newState = rootReducer(
      {
        ...initialState,
        highlights: {
          ...initialState.highlights,
          filter: ["red"],
          ids: ["2"],
          byId: { "2": highlight }
        }
      },
      addHighlight(highlight)
    );
    expect(newState.highlights.ids).toEqual(["2"]);
  });
});
