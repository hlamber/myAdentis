import { getSoumissions } from "../services/Soumissions";
import store from "..";
import { cacheSoumissions } from "../context/actions/docAction";
import { toast } from "react-toastify";

/** 
 * Check if campaigns are cached in redux store, and and call api if not
 * @param {Object} state - Initial state for our import component
 * @param {Object} action - An action to perform on our state
 * @returns {Object} - New state
*/

const checkSoumissions = async (token) => {
    const state = await store.getState()
    const soumissions = state.doc.soumissions;

    if (Object.keys(soumissions).length === 0) {
        getSoumissions()
            .then(res => {
                if (res){
                    if (res.length === 0) {
                        store.dispatch(cacheSoumissions(["No Documents found"]));
                        return true;
                    } else {
                        store.dispatch(cacheSoumissions(res));
                        return true;
                    }
                } else {
                    toast.error(res.detail);
                    return false;
                }
            })
    }
}

export default checkSoumissions;