import axios from 'axios';
import { GLOBAL_URL } from './utils';

const url = `${GLOBAL_URL}`;



export const checkPhapi = async (phoneNumber) => {
  const phonechek = await axios.get(`${url}/user/sign/checkphone?phoneNumber=${phoneNumber}`);
  console.log('폰넘버 후' + phonechek);
  return phonechek;
};

export const checkI = async (userid) => {
  const idResponse = await axios.get(`${url}/user/sign/checkid?userid=${userid}`);
  return idResponse;
};

export const joinU = async (data) => {

 try{
  const res = await axios.post(`${url}/user/sign/signup`, data);
  return res.data
 }catch(e){
console.log(e)
 }

};
