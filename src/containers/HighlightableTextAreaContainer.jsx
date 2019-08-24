//@flow
import { connect } from "react-redux";
import {
  addHighlight
} from "../actions";
import { HighlightableTextArea } from "../components";

export default connect(
  ({ highlights, highlightColor }) => ({ highlights, highlightColor }),
  { addHighlight }
)(HighlightableTextArea);
