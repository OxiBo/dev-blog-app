import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import authReducer from './authReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';

const reducers = combineReducers({
    dummy: () => "DUMMY",
    auth: authReducer,
    form: formReducer,
    posts: postReducer,
    comments: commentReducer
})

export default reducers; 