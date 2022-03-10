 import {createStore} from "redux"
 import {composeWithDevTools} from "redux-devtools-extension"
import cmbndReducers from "./cmbndReducer"
 
 const store = createStore(cmbndReducers,composeWithDevTools())
 export default store;