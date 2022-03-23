import * as api from '../api/posts';

export const getPost = (slug) => async (dispatch) => {
    try {
        const { data } = await api.getPost(slug);
        
        dispatch({ type: "GET_POST", payload: data.data.post });
    } catch (error) {
        console.log(error.message);
    }
}

export const insertPost = (newPost) => async (dispatch) => {
    try {
        const { data } = await api.insertPost(newPost);
        
        dispatch({ type: "INSERT_POST", payload: data.data.post });
    } catch (error) {
        console.log(error.message);
    }
}