import axios from 'axios';
import { GLOBAL_URL } from './utils';

const url = `${GLOBAL_URL}`;



export const checkPhapi = async (phoneNumber) => {
  const phonechek = await axios.get(`http://192.168.0.103:8100/user/sign/checkphone?phoneNumber=${phoneNumber}`);
  console.log('폰넘버 후' + phonechek);
  return phonechek;
};

export const checkI = async (userid) => {
  const idResponse = await axios.get(`http://192.168.0.103:8100/user/sign/checkid?userid=${userid}`);
  return idResponse;
};

export const joinU = async (data) => {
  console.log(data);
  await axios.post(`http://192.168.0.103:8100/user/sign/signin`, data);
  // if (localStorage.getItem('token') !== null) {
  //   localStorage.removeItem('token');
  // }

  // } catch (e) {
  //   console.log(e)
  //   alert('에러')
  // }
};
