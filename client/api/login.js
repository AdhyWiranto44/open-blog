import axios from 'axios';

const url = 'http://localhost:4000';

export const login = (username, password) => axios.post(`${url}/login`, { username, password });