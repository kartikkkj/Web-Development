const initialState ={
    laps:30
}
const LapReducer = (state=initialState, action)=>{
    switch(action.type){
        case "BUY_LAP":
            return {...state,laps:state.laps-1}
        case "SELL_LAP":
            return {...state,laps:state.laps+1}
        default:
            return state;
    }
}
export default LapReducer