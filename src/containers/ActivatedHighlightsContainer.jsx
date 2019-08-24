//@flow
import { connect } from "react-redux";
import { ActivatedHighlights } from "../components";

export default connect(
  ({ filteredHighlights }) => ({ filteredHighlights })
)(ActivatedHighlights);
