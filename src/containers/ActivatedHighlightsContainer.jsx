//@flow
import { connect } from "react-redux";
import { ActivatedHighlights } from "../components";

export default connect(
  ({ highlights: { filteredIds, byId } }) => ({ 
    highlights: filteredIds.map(id => byId[id])
  })
)(ActivatedHighlights);
