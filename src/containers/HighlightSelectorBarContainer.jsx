//@flow
import { connect } from "react-redux";
import {
  setHighlightColor,
  clearHighlights
} from "../actions";
import { HighlightSelectorBar } from "../components";

export default connect(
  ({ highlighterColors, highlightColor }) => ({ highlighterColors, highlightColor }),
  {
    clearHighlights,
    setHighlightColor
  }
)(HighlightSelectorBar);
