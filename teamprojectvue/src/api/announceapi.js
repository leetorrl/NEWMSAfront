import axios from 'axios';
import { GLOBAL_ANNOUNCE_URL } from './utils';

const url = `${GLOBAL_ANNOUNCE_URL}`;

export const loginannounceapi = async () => {
  // const token = localStorage.getItem('token')
  try {
    const res = await axios.get(`${url}/announce/searchforall`);
    // console.log("res = "+ JSON.stringify(res));
    return res;

  } catch (e) {
    console.log(e);
  }
};
