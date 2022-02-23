import axios from 'axios';

const url = 'http://localhost:4000/posts/tags';

export const getTags = () => axios.get(url);