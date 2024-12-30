import axios from 'axios';
import { useloginStore } from '@/stores/loginpinia';
import { GLOBAL_URL } from './utils';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';


const router = useRouter()
const url = `${GLOBAL_URL}`;

export const userdata = async () => {

  // const token = localStorage.getItem('token');
  const token = Cookies.get('token')
  const loginStore = useloginStore();
  const { doLogin } = loginStore;

  try {  //갯유저 api 완료시 집어넣기
    const res = await axios.get(`${url}/user/sign/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(!Cookies.get('token')){
      res.data.role = null
    }
    doLogin(res.data.name, res.data.role, res.data.accept, res.data.userid);

  } catch (e) {
    const logincheck = useloginStore();
    logincheck.loginchecktrue();
  }
};

export const userrole = async () => {

  const token = Cookies.get('token');
  // const token = localStorage.getItem('token');
  if(token==null){
    return;
  }

  const res = await axios.get(`${url}/user/sign/getuser`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const logincheck = useloginStore();
  console.log(res.data.role);
  logincheck.userR(res.data.role);

};


export const logincontrol = async (data) => {
  const logincheck = useloginStore();
  const { logincheckfalse } = logincheck;

  try {
    const response = await axios.post(`${url}/user/sign/signin`, data);

    Cookies.set('token', response.data ,{ sameSite: 'Strict' })


    // localStorage.setItem('token', response.data);

    logincheckfalse();

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
