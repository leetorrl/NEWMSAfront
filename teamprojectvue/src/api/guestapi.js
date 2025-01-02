import axios from "axios"
import { GLOBAL_URL } from "./utils"
import { MA_URL } from './utils';
const url = `${GLOBAL_URL}`
const maurl = `${MA_URL}`

export const gushowuserapi = async(data) => {
    try{
        const res = await axios.post(`${maurl}/attendance/getuser`, data)
        return res
    }catch(e){
        console.log(e)
    }
}

export const guattupdateapi = async(data) => {
    try{
        const res = await axios.post(`${maurl}/attendance/attupdate`, data)
        return res
    }catch(e){
        console.log(e)
    }
}

export const guattdeleteapi =async (idx) => {
    try{
        const res = await axios.delete(`${maurl}/attendance/attdelete/${idx}`)
        return res
    }catch(e){
        console.log(e)
    }
}