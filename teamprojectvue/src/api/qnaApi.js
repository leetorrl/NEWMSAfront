import Cookies from 'js-cookie';
import axios from 'axios';
import { GLOBAL_ANNOUNCE_URL, GLOBAL_QNA_URL, GLOBAL_URL } from './utils';
import { MA_URL } from './utils';

const url = `${GLOBAL_URL}`;
const qna_url = `${GLOBAL_QNA_URL}`;
const announce_url = `${GLOBAL_ANNOUNCE_URL}`;
const maurl = `${MA_URL}`

export const qna_list_api = async ( type ,pageNum=0 , size ) => {
  console.log(pageNum)
  try {
    const token = Cookies.get('token');
    const res = await axios.get(`http://192.168.0.107:8120/QnA/list`, {
      params: {
        type,
        token,
        pageNum,
        size
      },
    });
    return res.data;

  } catch (e) {
    console.log(e);
  }
};

export const qna_one_api = async (idx) => {
  const token = Cookies.get('token');

  try {
    const res = await axios.get(`http://192.168.0.107:8120/QnA/view/${idx}`, {
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
    const res = await axios.post(`http://192.168.0.107:8120/QnA/save`, data, {
      headers: {
        Authorization: `${token}`
      }
    });

    return res;
  } catch (e) {
    console.log(e);
  }
};

export const qna_delete_api = async(idx) => {

  const token = Cookies.get('token')

  try{
    const res = await axios.delete(`http://192.168.0.107:8120/QnA/delete/${idx}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res

  }catch(e){
    console.log(e)
  }
}


export const qna_change_api = async (data, idx) => {

  const token = Cookies.get('token')

  try{
   const res = await axios.post(`http://192.168.0.107:8120/QnA/change/${idx}`,data ,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data

  }catch(e){
    console.log(e)
  }
}

export const qna_chkcomment_api = async(idx) => {

  const token = Cookies.get('token');

  try{
     const res = await axios.post(`http://192.168.0.107:8120/QnA/qnacheck/${idx}`,
      {}, // 본문이 필요 없다면 빈 객체를 전달, ex) data객체
      {
        headers: {
          Authorization: `Bearer ${token}`, // 'Bearer ' 접두사를 추가한 Authorization 헤더
        },
      }
    );
    return res.data

  }catch(e){
    console.log(e)
  }
}

export const qna_search_api = async(query) => {

  const token = Cookies.get('token')

  try{
     const res = await axios.get(`http://192.168.0.107:8120/QnA/search?query=${query}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res

  }catch(e){
    console.log(e)
  }
}