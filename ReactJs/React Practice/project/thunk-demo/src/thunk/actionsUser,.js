import * as action from "./actions"
import axios from "axios"

const fetchreq =()=>{
    return {
        type:action.FETCH_REQ
    }
}
const fetchsuc =(users)=>{
    return {
        type:action.FETCH_SUC,
        payload:users
    }
}
const fetchfail =(error)=>{
    return {
        type:action.FETCH_FAIL,
        payload : error.message
    }
}
export const fetchUsers = ()=>{
    return async (dispatch)=>{
        dispatch(fetchreq())
        try{
            const res = await axios.get("https://jsonplaceholder.typicode.com/users")
            const data = res.data
            dispatch(fetchsuc(data))
        }
        catch(error){
            dispatch(fetchfail(error))
        }
    }
}