import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import LangReducer from "./LangReducer";

const store = createStore(LangReducer, composeWithDevTools())
export default store