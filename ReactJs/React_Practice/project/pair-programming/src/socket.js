import { io } from "socket.io-client";

export const initSocket = async()=>{
    const REACT_APP_BACKEND_URL = 'http://localhost:5000'
    const option = {
        'force new connection' : true,
        reconnectionAttempt : 'infinity',
        timeout:10000,
        transports: ['websocket'],
    }
    return io(REACT_APP_BACKEND_URL,option)
}