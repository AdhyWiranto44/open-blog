import axios from 'axios';

const url = 'http://localhost:4000';

export const login = (loginData) => axios.post(`${url}/login`, loginData);