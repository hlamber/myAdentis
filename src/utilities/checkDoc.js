import { getDocuments } from "../services/Documents";
import store from "..";
import { cacheDocuments } from "../context/actions/docAction";
import { toast } from "react-toastify";

/** 
 * Check if campaigns are cached in redux store, and and call api if not
 * @param {Object} state - Initial state for our import component
 * @param {Object} action - An action to perform on our state
 * @returns {Object} - New state
*/

const checkDoc = async (token) => {
    const state = await store.getState()
    const doc = state.doc.docList;

    if (Object.keys(doc).length === 0) {
        getDocuments()
            .then(res => {
                if (res){
                    if (res.length === 0) {
                        store.dispatch(cacheDocuments(["No Documents found"]));
                        return true;
                    } else {
                        store.dispatch(cacheDocuments(res));
                        return true;
                    }
                } else {
                    toast.error(res.detail);
                    return false;
                }
            })
    }
}

export default checkDoc;