import {combineReducers} from 'redux';
import userReducer from './userReducer';
import docReducer from './docReducer';

const allReducers = combineReducers({

    user: userReducer,
    doc: docReducer,

})

export default allReducers;