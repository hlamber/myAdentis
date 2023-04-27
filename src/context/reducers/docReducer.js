const initialState = {
    docList: [],
    soumissions: [],
    champsList: [],
    responsesList: [],
}

/**
 * Reducer for the contents components : search, campaigns, inserts.
 * @param {Object} state - Initial state for our contents components
 * @param {Object} action - An action to perform on our state
 * @returns {Object} - New state
 */
export const docReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CACHE_DOCUMENTS': return {
            ...state,
            docList: action.payload
        }
        case 'CACHE_SOUMISSIONS': return {
            ...state,
            soumissions: action.payload
        }
        case 'CACHE_CHAMPS': return {
            ...state,
            champsList: action.payload
        }
        case 'CACHE_RESPONSES': return {
            ...state,
            responsesList: action.payload
        }
        default: return state
    }
}

export default docReducer;
