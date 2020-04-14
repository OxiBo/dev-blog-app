import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import authReducer from './authReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';     
import filtersReducer from './filtersReducer';     

const reducers = combineReducers({
    auth: authReducer,
    form: formReducer,
    posts: postReducer,
    comments: commentReducer,
    filters: filtersReducer
})

export default reducers; 