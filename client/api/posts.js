import axios from 'axios';

const url = 'http://localhost:4000/posts';

export const getPosts = (title = "") => axios.get(`${url}?title=${title}`);
export const getArchivePosts = (title = "") => axios.get(`${url}?active=0&title=${title}`);
export const getPost = (slug) => axios.get(`${url}/${slug}`);
export const filterPosts = (filter) => axios.get(`${url}?title=${filter}`);
export const findByTag = (tag) => axios.get(`${url}/tags/${tag}`);
export const insertPost = (newPost) => axios.post(url, newPost);
export const updatePost = (slug, updatedPost) => axios.patch(`${url}/${slug}`, updatedPost);
export const removePost = (id) => axios.delete(`${url}/${id}`);