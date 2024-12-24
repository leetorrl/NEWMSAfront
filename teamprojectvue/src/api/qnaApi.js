import Cookies from 'js-cookie';
import axios from 'axios';
import { GLOBAL_ANNOUNCE_URL, GLOBAL_QNA_URL, GLOBAL_URL } from './utils';

const url = `${GLOBAL_URL}`;
const qna_url = `${GLOBAL_QNA_URL}`;
const announce_url = `${GLOBAL_ANNOUNCE_URL}`;

export const qna_list_api = async () => {
  try {
    const token = Cookies.get('token');
    const res = await axios.get(`${qna_url}/QnA/list`, { params: { token } });

    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const qna_one_api = async (idx) => {
  const token = Cookies.get('token');

  try {
    const res = await axios.get(`${qna_url}/QnA/view/${idx}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res;
  } catch (e) {
    console.log(e);
  }
};

export const qna_save_api = async (data) => {
  const token = Cookies.get('token');

  try {
    const res = await axios.post(`${qna_url}/QnA/save`, data, {
      headers: {
        Authorization: `${token}`
      }
    });

    return res;
  } catch (e) {
    console.log(e);
  }
};

export const qna_chkcomment_api = async(idx) => {

  const token = Cookies.get('token')

  try{
     const res = await axios.post(`${qna_url}/QnA/qnacheck/${idx}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res

  }catch(e){
    console.log(e)
  }
}

export const qna_search_api = async(query) => {

  const token = Cookies.get('token')

  try{
     const res = await axios.get(`${qna_url}/QnA/search?query=${query}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res

  }catch(e){
    console.log(e)
  }

}