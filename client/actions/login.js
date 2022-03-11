import * as api from '../api/login';

export const login = (username, password) => async (dispatch) => {
    try {
        const { data } = await api.login(username, password);
        
        dispatch({ type: "LOGIN", payload: data });
    } catch (error) {
        console.log(error.message);
    }
}