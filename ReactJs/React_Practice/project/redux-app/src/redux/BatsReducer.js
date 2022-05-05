const initialState ={
    bats:20
}
const BatsReducer = (state=initialState, action)=>{
    switch(action.type){
        case "BUY_BAT":
            return {...state,bats:state.bats-1}
        default:
            return state;

    }
}
export default BatsReducer