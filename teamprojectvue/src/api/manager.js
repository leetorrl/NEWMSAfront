import axios from "axios"
import { GLOBAL_URL } from "./utils"

const url = `${GLOBAL_URL}`

export const mngunCheckedapi = async(pageNum = 1) => {

    try{
        const response =await axios.get(`${url}/vacation/managerunchecked?pageNum=${pageNum - 1}`);

        return response

    }catch(e){
        console.log(e)
    }
}

export const mngnameSearchapi = async (pageNum , username)=> {

    try{

        const response = await axios.get(`${url}/vacation/managersearch?pageNum=${pageNum -1}&size=10&name=${username}`);

        return response

    }catch(e){
        console.log(e)
    }
}

export const mngfetchVacationsapi = async(pageNum = 1)=>{

    try{
        const response = await axios.get(`${url}/vacation/manager?pageNum=${pageNum - 1}`);
        return response

    }catch(e){
        console.log(e)
    }
}


export const mnghandleApproveapi = async(idx) => {

    try{
        await axios.post(`${url}/vacation/accept/${idx}`);

    }catch(e){
        console.log(e)
    }
}


export const mnghandleDenyapi = async(idx) => {

    try{
        await axios.post(`${url}/vacation/deny/${idx}`);
    }catch(e){
        console.log(e)
    }
}

export const mngdesclectrueapi = async() => {

    try{
        const res = await axios.get(`${url}/lecture/list`);
        return res
    }catch(e){
        console.log(e)
    }

}

export const mnggetlectureapi = async() => {

    try{
      const res =  await axios.get(`${url}/lecture/list`);
      return res

    }catch(e){
        console.log(e)
    }
}

export const mnggetmonthattapi = async(idx, month) => {

    try{
      const res = await axios.get(
            `${url}/attendance/monthview?idx=${idx}&month=${month}`
          );

          return res

    }catch(e){
        console.log(e)
    }
}

export const mnggetlectureapi2 = async() => {

    try{
       const res = await axios.get(`${url}/lecture/availlist`);

       return res

    }catch(e){
        console.log(e)
    }
}


export const mngsubapi = async(data) => {
    const token = Cookies.get('token')
    // const token = localStorage.getItem('token')

    try{

        await axios.post(`${url}/announce/save`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })

    }catch(e){
        console.log(e)
    }
}


export const mnggetlectureapi3 = async () => {

    try{
       const res = await axios.get(`${url}/lecture/availlist`);
       return res

    }catch(e){
        console.log(e)
    }
}

export const mngfetchannounceForAllapi = async (pageNum = 1) => {

    try{
      const response = await axios.get(`${url}/announce/searchforall?pageNum=${pageNum - 1}`);
      return response

    }catch(e){
        console.log(e)
    }
}

export const mngfetchannounceForAlldescapi = async (pageNum = 1) => {

    try{
      const response = await axios.get(`${url}/announce/searchforalldesc?pageNum=${pageNum - 1}`);

      return response

    }catch(e){
        console.log(e)
    }
}

export const mngfetchannounceByLectureapi = async(lectureIdx, pageNum = 1) => {

    try{
       const response = await axios.get(`${url}/announce/lecturesearch/${lectureIdx}?pageNum=${pageNum - 1}`);
       return response
    }catch(e){
        console.log(e)
    }
}

export const mngfetchannounceapi = async (pageNum) => {

    try{
      const response =  await axios.get(`${url}/announce/manager?pageNum=${pageNum - 1}`);

      return response
    }catch(e){
        console.log(e)
    }
}

export const mngfetchannounceByLecturedescapi = async(lectureIdx, pageNum=1) => {

    try{
        const response = await axios.get(`${url}/announce/lecturesearchdesc/${lectureIdx}?pageNum=${pageNum - 1}`);
        return response

    }catch(e){
        console.log(e)
    }
}

export const mngfetchannouncedescapi = async (pageNum = 1) => {

    try{
      const response =  await axios.get(`${url}/announce/managerdesc?pageNum=${pageNum - 1}`);

      return response
    }catch(e){
        console.log(e)
    }
}