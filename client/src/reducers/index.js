import { combineReducers } from 'redux';
import authReducer from './authReducer';

const reducers = combineReducers({
    dummy: () => "DUMMY",
    auth: authReducer
})

export default reducers; 