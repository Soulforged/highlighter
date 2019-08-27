//@flow
import { connect } from "react-redux";
import {
  addHighlight,
  clearHighlights,
  setText
} from "../actions";
import { HighlightableTextArea } from "../components";

export default connect(
  ({
    highlights: { byId, ids },
    highlightColor,
    text
  }) => ({
    highlights: ids.map(id => byId[id]),
    highlightColor,
    text
  }),
  { addHighlight, clearHighlights, setText }
)(HighlightableTextArea);
