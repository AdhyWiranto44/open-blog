import * as api from '../api/tags.js';

export const getTags = () => async (dispatch) => {
    try {
      const { data } = await api.getTags();
  
      dispatch({ type: "GET_TAGS", payload: data.data.tags });
    } catch (error) {
      console.log(error.message);
    }
  };