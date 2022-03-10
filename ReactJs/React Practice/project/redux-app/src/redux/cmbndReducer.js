import { combineReducers } from "redux";
import BallReducer from "./BallReducer";
import BatsReducer from "./BatsReducer";
import LapReducer from "./LapReducer";

const  cmbndReducers = combineReducers({
    bat:BatsReducer,
    ball:BallReducer,
    lap:LapReducer
})
export default cmbndReducers