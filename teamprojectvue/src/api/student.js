import axios from 'axios';
import { GLOBAL_ANNOUNCE_URL, GLOBAL_QNA_URL, GLOBAL_URL } from './utils';
import Cookies from 'js-cookie';
import { MA_URL } from './utils';
const url = `${GLOBAL_URL}`;
const qna_url = `${GLOBAL_QNA_URL}`;
const announce_url = `${GLOBAL_ANNOUNCE_URL}`;
const maurl = `${MA_URL}`

export const profiledata = async () => {
  try {
    const token = Cookies.get('token');
    // const token = localStorage.getItem('token')
    const profileres = await axios.get(`${maurl}/user/getuser`, {
    // const profileres = await axios.get(`${url}/user/sign/getuser`, {

      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return profileres;
  } catch (e) {
    console.log(e);
  }
};

export const getmylecture = async () => {
  const token = Cookies.get('token');
  // const token = localStorage.getItem('token')
  const mylectureres = await axios.get(`${maurl}/lecture/mylecture`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return mylectureres;
};

export const subapi = async (data) => {
  try {
    const token = Cookies.get('token');
    const res = await axios.post(`${maurl}/vacation/request`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res;
  } catch (e) {
    console.log(e);
  }
};

export const showuserresuserapi = async () => {
  try {
    const token = Cookies.get('token');
    const resuser = await axios.get(`${maurl}/user/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return resuser;
  } catch (e) {
    console.log(e);
  }
};

export const showuserresattapi = async (data) => {
  try {
    const resatt = await axios.post(`${maurl}/attendance/getuser`, data);

    return resatt;
  } catch (e) {
    console.log(e);
  }
};

export const stunCheckedapi = async (pageNum = 1) => {
  try {
    const token = Cookies.get('token');
    // const token = localStorage.getItem('token');
    const response = await axios.get(`${maurl}/vacation/studentunchecked?pageNum=${pageNum - 1}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (e) {
    console.log(e);
  }
};

export const stfetchVacationsapi = async (pageNum = 1) => {
  try {
    const token = Cookies.get('token');
    // const token = localStorage.getItem('token');
    const response = await axios.get(`${maurl}/vacation/student?pageNum=${pageNum - 1}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (e) {
    console.log(e);
  }
};

export const stshowuserapi = async () => {
  try {
    const token = Cookies.get('token');
    // const token = localStorage.getItem('token');

    const resuser = await axios.get(`${maurl}/user/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return resuser;
  } catch (e) {
    console.log(e);
  }
};

export const stshowuserttapi = async (data) => {
  try {
    const resatt = await axios.post(`${maurl}/attendance/getuser`, data);

    return resatt;
  } catch (e) {
    console.log(e);
  }
};

export const stshowuserattapi = async () => {
  try {
    const token = Cookies.get('token');
    // const token = localStorage.getItem('token');

    const resuser = await axios.get(`${maurl}/user/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return resuser;
  } catch (e) {
    console.log(e);
  }
};

export const stshowuseratt2api = async (data) => {
  try {
    const resatt = await axios.post(`${maurl}/attendance/getuser`, data);

    return resatt;
  } catch (e) {
    console.log(e);
  }
};

export const stattupdate = async (data) => {
  try {
    const res = await axios.post(`${maurl}/attendance/attupdate`, data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const stattdelete = async (idx) => {
  try {
    const res = await axios.delete(`${maurl}/attendance/attdelete/${idx}`);

    return res;
  } catch (e) {
    console.log(e);
  }
};

export const stgetlectureapi = async () => {
  try {
    const token = Cookies.get('token');
    // const token = localStorage.getItem('token');
    const res = await axios.get(`${maurl}/lecture/mylecture`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res;
  } catch (e) {
    console.log(e);
  }
};

export const stfetchannounceForAllapi = async (pageNum = 1) => {
  try {
    const response = await axios.get(`${maurl}/announce/searchforall?pageNum=${pageNum - 1}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const stfetchannounceForAlldescapi = async (pageNum = 1) => {
  try {
    const response = await axios.get(`${maurl}/announce/searchforalldesc?pageNum=${pageNum - 1}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const stfetchannounceByLectureapi = async (lectureIdx, pageNum = 1) => {
  try {
    const response = await axios.get(
      `${maurl}/announce/lecturesearch/${lectureIdx}?pageNum=${pageNum - 1}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const stfetchannounceByLecturedescapi = async (lectureIdx, pageNum = 1) => {
  try {
    const response = await axios.get(
      `${maurl}/announce/lecturesearchdesc/${lectureIdx}?pageNum=${pageNum - 1}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const stfetchannounceapi = async (pageNum = 1) => {
  try {
    const token = Cookies.get('token');
    // const token = localStorage.getItem('token');
    const response = await axios.get(`${maurl}/announce/teacher?pageNum=${pageNum - 1}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (e) {
    console.log(e);
  }
};

export const stfetchannouncedescapi = async (pageNum) => {
  try {
    const token = Cookies.get('token');
    // const token = localStorage.getItem('token');
    const response = await axios.get(`${maurl}/announce/teacherdesc?pageNum=${pageNum - 1}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const stQnAlistapi = async () => {
  try {
    const token = Cookies.get('token');
    const res = await axios.get(`http://192.168.0.107/QnA/list`,
      { params: { token } }
    );
    
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }

  // const token = Cookies.get('token')

  // try{
  //     const res = await axios.get(`${url}/announce/student?pageNum=${pageNum - 1}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });

  //     return res.data
  // }catch(e){
  //     console.log(e)
  // }
};

export const stQnAviewapi = async (idx) => {
  const token = Cookies.get('token');

  try {
    const res = await axios.get(`http://192.168.0.107/QnA/view/${idx}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res;
  } catch (e) {
    console.log(e);
  }
};

export const stQnAboardsaveapi = async (data) => {
  const token = Cookies.get('token');

  try {
    const res = await axios.post(`http://192.168.0.107/QnA/save`, data, {
      headers: {
        Authorization: `${token}`
      }
    });

    return res;
  } catch (e) {
    console.log(e);
  }
};

export const stgetuserapi = async () => {
  const token = Cookies.get('token');

  try {
    const res = await axios.get(`http://192.168.0.107/user/sign/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};


export const savecommentapi = async (idx, data) => {

  const token = Cookies.get('token')

  try{
    const res = axios.post(`http://192.168.0.107/QnA/comment/${idx}`,data, { params: { token } })

    return res

  }catch(e){
    console.log(e)
  }
}