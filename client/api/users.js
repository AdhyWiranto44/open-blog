import axios from 'axios';
import Cookies from 'js-cookie';


const url = 'http://localhost:4000/users';
const token = Cookies.get("X-OPEN-BLOG-TOKEN");

export const register = (user) => axios.post(`${url}?token=${token}`, user);