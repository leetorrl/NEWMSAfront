import axios from "axios"
import { GLOBAL_URL } from "./utils"

const url = `${GLOBAL_URL}`

export const gushowuserapi = async(data) => {
    try{
        const res = await axios.post(`${url}/attendance/getuser`, data)
        return res
    }catch(e){
        console.log(e)
    }
}

export const guattupdateapi = async(data) => {
    try{
        const res = await axios.post(`${url}/attendance/attupdate`, data)
        return res
    }catch(e){
        console.log(e)
    }
}

export const guattdeleteapi =async (idx) => {
    try{
        const res = await axios.delete(`${url}/attendance/attdelete/${idx}`)
        return res
    }catch(e){
        console.log(e)
    }
}