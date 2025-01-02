import axios from 'axios';
import { MA_URL } from './utils';
import { GLOBAL_URL } from './utils';
import Cookies from 'js-cookie';

const url = `${GLOBAL_URL}`;
const maurl = `${MA_URL}`

export const announce_list_api = async(idx) => {
    try{
        const token = Cookies.get('token')
        // const token = localStorage.getItem('token')

        const res = await axios.get(`${maurl}/announce/view/${idx}`,{

            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        return res
        
    }catch(e){
        console.log(e)
    }
}