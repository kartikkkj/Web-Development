const initialState = {
    mode : "text/x-c++src",
}
const LangReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'cpp':
            return {...state, mode:'text/x-c++src'}
        case 'py': 
            return {...state, mode:'python'}
        case 'java':
            return {...state, mode:'text/x-java'}
        case 'js':
            return {...state, mode:'javascript'}
        default:
            return {...state, mode:'text/x-c++src'}
    }
}
export default LangReducer;