import axios from 'axios'

const api = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    // baseURL: process.env.REAC_APP_API_URL,
    withCredentials:true,
    headers : {
        "Content-type":"application/json",
        Accept: "application/json"
    }
})
export const sendOtp = (data)=> api.post("http://localhost:5000/api/send-otp", data);
export const verifyOtp  = (data) => api.post("http://localhost:5000/api/verify-otp", data);
export const activate = (data)=> api.post("http://localhost:5000/api/activate", data);
export default api; 