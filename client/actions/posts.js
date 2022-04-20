import * as api from '../api/posts.js';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.getPosts();
  
        dispatch({ type: "GET_POSTS", payload: data.data.posts });
    } catch (error) {
        console.log(error.message);
    }
};

export const getArchivePosts = (title = "", token = "") => async (dispatch) => {
    try {
        const { data } = await api.getArchivePosts(title, token);
  
        dispatch({ type: "GET_ARCHIVE_POSTS", payload: data.data.posts });
    } catch (error) {
        console.log(error.message);
    }
}

export const filterPosts = (filter) => async (dispatch) => {
    try {
        const { data } = await api.filterPosts(filter);
        
        dispatch({ type: "FILTER_POSTS", payload: data.data.posts });
    } catch (error) {
        console.log(error.message);
    }
}

export const findByTag = (tag) => async (dispatch) => {
    try {
        const { data } = await api.findByTag(tag);
        
        dispatch({ type: "FIND_BY_TAG", payload: data.data.posts });
    } catch (error) {
        console.log(error.message);
    }
}