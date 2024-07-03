import { combineReducers } from 'redux';
import ownerReducer from './owner/ownerSlice';

const rootReducer = combineReducers({
    owner: ownerReducer,
});

export default rootReducer;
