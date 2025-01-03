import axios from 'axios';
import { GLOBAL_URL } from './utils';
import { ref } from 'vue';
import Cookies from 'js-cookie';
import { MA_URL } from './utils';
const url = `${GLOBAL_URL}`
const maurl = `${MA_URL}`

export const fetchVacationsapi = async(pageNum) => {

    try{
        const token = Cookies.get('token')
        // const token = localStorage.getItem('token');

        const response = await axios.get(`${maurl}/vacation/teacher?pageNum=${pageNum - 1}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });

          return response

    }catch(e){
        console.log(e)
    }
}

export const showuserapi = async() => {

try{
    const token = Cookies.get('token')
    // const token = localStorage.getItem('token')

    const resuser = await axios.get(`${maurl}/user/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return resuser

}catch(e){
    console.log(e)
    }
}

export const getattlistapi = async(data) => {

    try{
        const resatt = await axios.post(`${maurl}/attendance/getuser`, data);

        return resatt.data

    }catch(e){
        console.log(e)
    }
}

export const getuserapi = async() => {

    try{
        const token = Cookies.get('token')
        // const token =  localStorage.getItem('token');

      const res = await axios.get(`${maurl}/user/getuser`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          return res

    }catch(e){
        console.log(e)
    }
}

export const teachercheckapi = async (idx) => {

    try{

        await axios.post(`${maurl}/attendance/teacheraccept/${idx}`);
    
    }catch(e){
        console.log(e)
    }
}

export const todayviewapi = async() => {

    try{
        const token = Cookies.get('token')
        // const token = localStorage.getItem('token');
        const res = await axios.get(`${maurl}/attendance/todayteacherview`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    
        return res

    }catch(e){
        console.log(e)
    }
}

export const getlectureapi =async () => {

    try{
        const token = Cookies.get('token')

        // const token = localStorage.getItem('token');

         const res = await axios.get(`${maurl}/lecture/mylecture`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

         return res

    }catch(e){
        console.log(e)
    }
}


export const desclectureapi = async() => {

    try{
        const token = Cookies.get('token')
        // const token = localStorage.getItem('token');
        const res = await axios.get(`${maurl}/lecture/mylecture`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          return res

    }catch(e){
        console.log(e)
    }
}

export const getmonthattapi = async(idx, month) => {

    try{

        const res = await axios.get(
            `${maurl}/attendance/monthview?idx=${idx}&month=${month}`
          );

          return res

    }catch(e){
        console.log(e)
    }
}


export const getAnnouncelectureapi = async() => {

    try{
        const token = Cookies.get('token')
        // const token = localStorage.getItem('token');

       const res = await axios.get(`${maurl}/lecture/mylecture`,{
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });

          return res

    }catch(e){
        console.log(e)
    }
}


export const subapi = async(data) => {

    try{
        const token = Cookies.get('token')
        // const token = localStorage.getItem('token')
        const res = await axios.post(`${maurl}/announce/save`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })

          return res

    }catch(e){
        console.log(e)
    }
}

export const getAnnouncelistlectureapi = async() => {

    try{
        const token = Cookies.get('token')
        // const token = localStorage.getItem('token');

       const res = await axios.get(`${maurl}/lecture/mylecture`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          return res

    }catch(e){
        console.log(e)
    }
}

export const fetchannounceForAllapi = async(Num=1) => {

    try{
        const response = await axios.get(`${maurl}/announce/searchforall?pageNum=${Num- 1}`);

        return response.data;

    }catch(e){
        console.log(e)
    }
}

export const fetchannounceForAlldescapi = async(Num = 1) => {

    try{
        const response = await axios.get(`${maurl}/announce/searchforalldesc?pageNum=${Num - 1}`);
        return response.data

    }catch(e){
        console.log(e)
    }
}

export const fetchannounceByLectureapi = async (lectureIdx, Num = 1) => {

    try{
        const response = await axios.get(`${maurl}/announce/lecturesearch/${lectureIdx}?pageNum=${Num - 1}`);
        return response.data

    }catch(e){
        console.log(e)
    }
}

export const fetchannounceByLecturedescapi = async(lectureIdx, Num = 1) => {

    try{
        const response = await axios.get(`${maurl}/announce/lecturesearchdesc/${lectureIdx}?pageNum=${Num - 1}`);
        return response.data

    }catch(e){
        console.log(e)
    }
}

export const fetchannounceapi = async(Num = 1) => {

    try{
        const token = Cookies.get('token')
        // const token = localStorage.getItem('token');
  
 const response = await axios.get(`${maurl}/announce/teacher?pageNum=${Num - 1}`,{
                  headers: {
                           Authorization: `Bearer ${token}`
                           }
});
console.log("최신 일루나")
console.log(response)

return response.data
    }catch(e){
        console.log(e)
    }
}


export const fetchannouncedescapi = async(Num = 1) => {

    try{
        const token = Cookies.get('token')
        // const token = localStorage.getItem('token');
        const response = await axios.get(`${maurl}/announce/teacherdesc?pageNum=${Num - 1}`,{
            headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log("과거?일루오나")
            console.log(response)

            return response.data

    }catch(e){
        console.log(e)
    }
}
