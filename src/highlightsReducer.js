import {
  ADD_HIGHLIGHT,
  CLEAR_HIGHTLIGHTS,
  ADD_SELECTED_HIGHLIGHT_OPTION,
  REMOVE_SELECTED_HIGHLIGHT_OPTION
} from "./actions";

const initialState = {
  ids: [],
  byId: {},
  filteredIds: [],
  filter: []
};

/**
* Adds a new id to the filtered list only if that id is no longer there.
* The filteredIds are sorted when updated by comparing the 'start' of each highlight.
**/
const addNewFilteredId = (filter, filteredIds, byId, id) => {
  const { color } = byId[id];
  if (filter.indexOf(color) !== -1 && filteredIds.indexOf(id) === -1) {
    return [...filteredIds, id].sort((id1, id2) => byId[id1].start > byId[id2].start ? 1 : -1);
  }
  return filteredIds;
}

export default (state = initialState, action) => {
  const {
    ids,
    byId,
    filter,
    filteredIds
  } = state;
  switch(action.type) {
    case ADD_HIGHLIGHT: {
      const { highlight } = action;
      const { id } = highlight;
      if (ids.indexOf(id) !== -1) {
        return state;
      }
      const newById = { ...byId, [id]: highlight };
      return {
        ...state,
        ids: [...ids, id],
        byId: newById,
        filteredIds: addNewFilteredId(filter, filteredIds, newById, id)
      };
    };
    case CLEAR_HIGHTLIGHTS: return { ...state, byId: {}, ids: [], filteredIds: [] };
    case ADD_SELECTED_HIGHLIGHT_OPTION: {
      const newFilter = [...filter, action.color];
      const newFilteredIds = ids.reduce((acc, id) => (
        addNewFilteredId(newFilter, acc, byId, id)
      ), filteredIds)
      return {
        ...state,
        filter: newFilter,
        filteredIds: newFilteredIds
      };
    }

    case REMOVE_SELECTED_HIGHLIGHT_OPTION: {
      const newFilter = filter.filter(opt => opt !== action.color);
      return {
        ...state,
        filteredIds: filteredIds.filter(id => byId[id].color !== action.color),
        filter: newFilter
      };
    }

    default: return state;
  }
};
