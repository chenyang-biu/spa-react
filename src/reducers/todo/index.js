const initialState = {
  byId: {},
  list: [],
}

/**
 * @param {object} state
 * @param {array} state.list
 * @param {object} state.byId
 * @param {object} action
 * @param {string} action.type
 * @param {object} action.payload
 */
export default function todo(state = initialState, action) {
  let tmpState = {}
  switch (action.type) {
    case 'ADD_TODO':
      tmpState = {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...action.payload,
          },
          list: [...state.list, action.payload],
        },
      }
      return tmpState

    default:
      return state
  }
}
