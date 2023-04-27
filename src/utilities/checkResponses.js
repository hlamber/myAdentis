import { getResponses } from "../services/Soumissions";
import store from "..";
import { cacheResponses } from "../context/actions/docAction";
import { toast } from "react-toastify";

/** 
 * Check if campaigns are cached in redux store, and and call api if not
 * @param {Object} state - Initial state for our import component
 * @param {Object} action - An action to perform on our state
 * @returns {Object} - New state
*/

const checkResponses = async (id) => {
    const state = await store.getState()
    const responses = state.doc.responsesList;

    if (Object.keys(responses).length === 0) {
        getResponses(id)
            .then(res => {
                if (res){
                    if (res.length === 0) {
                        store.dispatch(cacheResponses(["No Champs found"]));
                        return true;
                    } else {
                        store.dispatch(cacheResponses(res));
                        return true;
                    }
                } else {
                    toast.error(res.detail);
                    return false;
                }
            })
    }
}

export default checkResponses;