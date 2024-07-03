import { combineReducers } from 'redux';
import ownerReducer from './owner/ownerSlice';
import dogReducer from './dog/dogSlice';

const rootReducer = combineReducers({
    owner: ownerReducer,
    dog: dogReducer,
});

export default rootReducer;
