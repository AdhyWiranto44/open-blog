import * as api from '../api/login';

export const login = (loginData) => async (dispatch) => {
    try {
        const { data } = await api.login(loginData);
        
        dispatch({ type: "LOGIN", payload: data });
    } catch (error) {
        console.log(error.message);
    }
}