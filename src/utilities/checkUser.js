import { getUsers } from "../services/Users";
import store from "..";
import { cacheUser } from "../context/actions/userAction";
import { toast } from "react-toastify";

/** 
 * Check if user info is cached in redux store, and and call api if not
 * @param {Object} state - Initial state for our import component
 * @param {Object} action - An action to perform on our state
 * @returns {Object} - New state
*/



const checkUser = async () => {
    const state = await store.getState()
    const user = state.user.infoUser;
    

    if (Object.keys(user).length === 0) {

        getUsers()
        .then( result => {
            if (result){
                if (result.length === 0) {
                    store.dispatch(cacheUser(["No user found"]));
                    return true;
                } else {
                    for (var r in result){
                        if (result[r].email === (sessionStorage.userEmail)){
                            store.dispatch(cacheUser(result[r]));
                        }
                    }
                    return true;
                }
            } else {
                toast.error(result.detail);
                // logOut();
                return false;
            }
        });  
    }
}

export default checkUser;