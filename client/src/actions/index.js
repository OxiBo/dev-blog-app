import { FETCH_CURRENT_USER } from './types';
import axios from 'axios';

export const fetchCurrentUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    console.log(res);
    dispatch({ type: FETCH_CURRENT_USER, payload: res.data});
}