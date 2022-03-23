import axios from 'axios';

const url = 'http://localhost:4000/posts';

export const getPosts = () => axios.get(url);
export const getArchivePosts = () => axios.get(`${url}?active=0`);
export const getPost = (slug) => axios.get(`${url}/${slug}`);
export const filterPosts = (filter) => axios.get(`${url}?title=${filter}`);
export const findByTag = (tag) => axios.get(`${url}/tags/${tag}`);
export const insertPost = (newPost) => axios.post(url, newPost);