import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import authReducer from './authReducer';
import postReducer from './postReducer';

const reducers = combineReducers({
    dummy: () => "DUMMY",
    auth: authReducer,
    form: formReducer,
    posts: postReducer
})

export default reducers; 