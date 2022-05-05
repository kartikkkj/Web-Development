import { FETCH_FAIL, FETCH_SUC , FETCH_REQ} from "./actions"

const initialState = {
    loading : false,
    error: "",
    users: []
}

const reducer = (state = initialState, action)=>{
        switch(action.type){
            case FETCH_REQ :
                return  {...state,loading : true}
            case FETCH_SUC :
                return  {...state, loading:false, users:[...action.payload]}
            case FETCH_FAIL :
                return {...state,loading:false, error:action.payload}
            default :
                return state
        }
}
export default reducer