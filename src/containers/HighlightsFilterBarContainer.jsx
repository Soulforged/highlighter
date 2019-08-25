//@flow
import { connect } from "react-redux";
import {
  addSelectedHighlightOption,
  removeSelectedHighlightOption
} from "../actions";
import { HighlightsFilterBar } from "../components";

export default connect(
  ({ highlights: { filter } }) => ({ filter }),
  {
    addSelectedHighlightOption,
    removeSelectedHighlightOption
  }
)(HighlightsFilterBar);
