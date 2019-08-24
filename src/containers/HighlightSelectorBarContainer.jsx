//@flow
import { connect } from "react-redux";
import {
  setHighlightColor,
} from "../actions";
import { HighlightSelectorBar } from "../components";

export default connect(
  ({ highlighterColors, highlightColor }) => ({ highlighterColors, highlightColor }),
  {
    setHighlightColor
  }
)(HighlightSelectorBar);
