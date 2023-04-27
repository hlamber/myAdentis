import { getDocumentsById } from "../services/Documents";
import store from "..";
import { cacheChamps } from "../context/actions/docAction";
import { toast } from "react-toastify";

/** 
 * Check if campaigns are cached in redux store, and and call api if not
 * @param {Object} state - Initial state for our import component
 * @param {Object} action - An action to perform on our state
 * @returns {Object} - New state
*/

const checkChamps = async (id) => {
    const state = await store.getState()
    const champs = state.doc.champsList;

    if (Object.keys(champs).length === 0) {
        getDocumentsById(id)
            .then(res => {
                if (res){
                    if (res.length === 0) {
                        store.dispatch(cacheChamps([]));
                        return true;
                    } else {
                        store.dispatch(cacheChamps(res));
                        return true;
                    }
                } else {
                    toast.error(res.detail);
                    return false;
                }
            })
    }
}

export default checkChamps;