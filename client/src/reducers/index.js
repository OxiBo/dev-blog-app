import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import authReducer from './authReducer';

const reducers = combineReducers({
    dummy: () => "DUMMY",
    auth: authReducer,
    form: formReducer
})

export default reducers; 