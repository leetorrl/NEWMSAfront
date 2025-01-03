import axios from 'axios';
import { GLOBAL_URL } from './utils';
import Cookies from 'js-cookie';
import { MA_URL } from './utils';

const url = `${GLOBAL_URL}`
const maurl = `${MA_URL}`

export const getavaillectureapi = async() => {

    try{
    
       const res = await axios.get(`${maurl}/lecture/availlist`);

       return res

    }catch(e){
          console.log(e)
    }
}

export const lecturejoinapi = async(data) => {

    const token = Cookies.get('token')
    // const token = localStorage.getItem('token');

    try{

      const res = await axios.post(`${maurl}/lecture/join`, data, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          return res

    }catch(e){
        console.log(e)
    }
}

export const insertlectureapi = async(data) => {

    try{

      const res = await axios.post(`${maurl}/lecture/save`, data);

      return res

    }catch(e){
        console.log(e)
    }
}

export const getavaillecturelistapi = async() => {

    try{

       const res = await axios.get(`${maurl}/lecture/list`);

       return res

    }catch(e){
        console.log(e)
    }
}