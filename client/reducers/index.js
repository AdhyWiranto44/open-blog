import { combineReducers } from "redux";

import posts from './posts';
import post from './post';
import tags from './tags';

export default combineReducers({ posts, post, tags });