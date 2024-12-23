import Cookies from 'js-cookie';
import axios from 'axios';
import { GLOBAL_ANNOUNCE_URL, GLOBAL_QNA_URL, GLOBAL_URL } from './utils';

const url = `${GLOBAL_URL}`;
const qna_url = `${GLOBAL_QNA_URL}`;
const announce_url = `${GLOBAL_ANNOUNCE_URL}`;

export const commnet_list_api = async (qna_idx) => {
  try {
    const token = Cookies.get('token');
    const res = await axios.get(`${qna_url}/comment/${qna_idx}/list`, { params: { token } });

    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const save_comment_api = async (qna_idx, data) => {
  const token = Cookies.get('token');

  try {
    const res = axios.post(`${qna_url}/comment/${qna_idx}/insert`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(JSON.stringify(res));
    return res.date;
  } catch (e) {
    console.log(e);
  }
};