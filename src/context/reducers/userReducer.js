const initialState = {
    infoUser: [],
}

/** 
 * Reducer for the contents components : search, campaigns, inserts.
 * @param {Object} state - Initial state for our contents components
 * @param {Object} action - An action to perform on our state
 * @returns {Object} - New state
*/
export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CACHE_USER': return {
            ...state,
            infoUser: action.payload
        }
        default: return state
    }
}

export default userReducer;