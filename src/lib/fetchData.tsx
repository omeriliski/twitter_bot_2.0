import axios from "axios";

export const fetchData = async (url:string)=>{
    try {
        const response = await axios.get(url)
        return response;
    } catch (error) {
        return error;
    }
}

export const fetchDataPrivate = async(url:string)=>{
    const token = JSON.parse(localStorage.getItem("activeUser")!).token;
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    try {
        const response = await axios.get(url,config)
        return response;
    } catch (error) {
        return error;
    }
} 