import axios from 'axios';
import { GLOBAL_ANNOUNCE_URL, GLOBAL_QNA_URL, GLOBAL_URL } from './utils';
import Cookies from 'js-cookie';

const url = `${GLOBAL_URL}`;
const qna_url = `${GLOBAL_QNA_URL}`;
const announce_url = `${GLOBAL_ANNOUNCE_URL}`;

export const profiledata = async () => {
  try {
    const token = Cookies.get('token');
    // const token = localStorage.getItem('token')
    const profileres = await axios.get(`${url}/user/getuser`, {
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
  const mylectureres = await axios.get(`${url}/lecture/mylecture`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return mylectureres;
};

export const subapi = async (data) => {
  try {
    const token = Cookies.get('token');
    const res = await axios.post(`${url}/vacation/request`, data, {
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
    const resuser = await axios.get(`${url}/user/getuser`, {
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
    const resatt = await axios.post(`${url}/attendance/getuser`, data);

    return resatt;
  } catch (e) {
    console.log(e);
  }
};

export const stunCheckedapi = async (pageNum = 1) => {
  try {
    const token = Cookies.get('token');
    // const token = localStorage.getItem('token');
    const response = await axios.get(`${url}/vacation/studentunchecked?pageNum=${pageNum - 1}`, {
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
    const response = await axios.get(`${url}/vacation/student?pageNum=${pageNum - 1}`, {
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

    const resuser = await axios.get(`${url}/user/getuser`, {
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
    const resatt = await axios.post(`${url}/attendance/getuser`, data);

    return resatt;
  } catch (e) {
    console.log(e);
  }
};

export const stshowuserattapi = async () => {
  try {
    const token = Cookies.get('token');
    // const token = localStorage.getItem('token');

    const resuser = await axios.get(`${url}/user/getuser`, {
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
    const resatt = await axios.post(`${url}/attendance/getuser`, data);

    return resatt;
  } catch (e) {
    console.log(e);
  }
};

export const stattupdate = async (data) => {
  try {
    const res = await axios.post(`${url}/attendance/attupdate`, data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const stattdelete = async (idx) => {
  try {
    const res = await axios.delete(`${url}/attendance/attdelete/${idx}`);

    return res;
  } catch (e) {
    console.log(e);
  }
};

export const stgetlectureapi = async () => {
  try {
    const token = Cookies.get('token');
    // const token = localStorage.getItem('token');
    const res = await axios.get(`${url}/lecture/mylecture`, {
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
    const response = await axios.get(`${url}/announce/searchforall?pageNum=${pageNum - 1}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const stfetchannounceForAlldescapi = async (pageNum = 1) => {
  try {
    const response = await axios.get(`${url}/announce/searchforalldesc?pageNum=${pageNum - 1}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const stfetchannounceByLectureapi = async (lectureIdx, pageNum = 1) => {
  try {
    const response = await axios.get(
      `${url}/announce/lecturesearch/${lectureIdx}?pageNum=${pageNum - 1}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const stfetchannounceByLecturedescapi = async (lectureIdx, pageNum = 1) => {
  try {
    const response = await axios.get(
      `${url}/announce/lecturesearchdesc/${lectureIdx}?pageNum=${pageNum - 1}`
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
    const response = await axios.get(`${url}/announce/teacher?pageNum=${pageNum - 1}`, {
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
    const response = await axios.get(`${url}/announce/teacherdesc?pageNum=${pageNum - 1}`, {
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
    const resss = await axios.get(`${qna_url}/QnA/list`,
      { params: { token } }
    );
    console.log(resss);
    return resss.data;
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
  const ttk = Cookies.get('ttk');

  try {
    const res = await axios.get(`http://192.168.0.69:8080/QnA/view/${idx}`, {
      headers: {
        Authorization: `Bearer ${ttk}`
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
    const res = await axios.post(`${qna_url}/QnA/save`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res;
  } catch (e) {
    console.log(e);
  }
};

export const stgetuserapi = async () => {
  const ttk = Cookies.get('ttk');

  try {
    const res = await axios.get(`http://192.168.0.69:8080/user/getuser`, {
      headers: {
        Authorization: `Bearer ${ttk}`
      }
    });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
