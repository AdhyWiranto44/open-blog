import * as api from '../api/posts';

export const getPost = (slug) => async (dispatch) => {
    try {
        const { data } = await api.getPost(slug);
        
        dispatch({ type: "GET_POST", payload: data.data.post });
    } catch (error) {
        console.log(error.message);
    }
}

export const insertPost = (token, newPost) => async (dispatch) => {
    try {
        const { data } = await api.insertPost(token, newPost);
        
        dispatch({ type: "INSERT_POST", payload: data.data.post });
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (updatedPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(updatedPost);
        
        dispatch({ type: "UPDATE_POST", payload: data.data.post });
    } catch (error) {
        console.log(error.message);
    }
}