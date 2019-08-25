//@flow
import { connect } from "react-redux";
import {
  addHighlight,
  clearHighlights
} from "../actions";
import { HighlightableTextArea } from "../components";

export default connect(
  ({
    highlights: { byId, ids },
    highlightColor
  }) => ({
    highlights: ids.map(id => byId[id]),
    highlightColor
  }),
  { addHighlight, clearHighlights }
)(HighlightableTextArea);
