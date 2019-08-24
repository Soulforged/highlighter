//@flow
import { connect } from "react-redux";
import {
  addSelectedHighlightOption,
  removeSelectedHighlightOption
} from "../actions";
import { HighlightsFilterBar } from "../components";

export default connect(
  ({
    highlighterColors,
    selectedHighlightOptions
  }) => ({ highlighterColors, selectedHighlightOptions }),
  {
    addSelectedHighlightOption,
    removeSelectedHighlightOption
  }
)(HighlightsFilterBar);
