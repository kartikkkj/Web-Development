import React, { useEffect, useState ,useRef } from 'react'
import EditorPageAside from './utilityComponent/EditorPageAside'
import Editor from './utilityComponent/Editor'
import { initSocket } from "../socket";
import ACTION, { JOINED } from "../Actions";
import { connect } from "react-redux";
import {Navigate, useLocation,useNavigate, useParams} from 'react-router-dom'
import toast from "react-hot-toast";


const mapDispatchToProps=(dispatch)=>{
  return {
      chooseLang : (mode) => dispatch({type:mode})
  }
}
function EditorPage(props) {
  const socketRef = useRef(null) 
  const location = useLocation()
  const {roomId} = useParams()
  const codeRef = useRef(null)
  const langRef = useRef(null)
  const ReactNavigate = useNavigate();
  const [allClient, setAllClient] = useState([])
  useEffect( ()=>{
      const init = async ()=>{
          socketRef.current = await initSocket()
          socketRef.current.on('connect_error',(err)=>handleErrors(err))
          socketRef.current.on('connect_failed',(err)=>handleErrors(err))
          function handleErrors(err){
              console.log(err);
              toast.error("Server Connection Faild 😔")
              ReactNavigate("/")
          }
          socketRef.current.emit(ACTION.JOIN,{
              roomId,
              name:location.state?.name
          })
          socketRef.current.on(ACTION.JOINED, ({clients, name, socketId})=>{
            socketRef.current.emit(ACTION.SYNC_CODE,{
              roomId,
              code:codeRef.current,
              // lang:langRef.current,
            });
            
            setAllClient(clients)
            if(name !== location.state?.name){
              toast.success(`${name} Joined You 🙂`)
            }
            else if(name === location.state?.name){
              toast.success(`You are Joined 🙂`)
            }
          })
          socketRef.current.on(ACTION.DISCONNECTED, ({socketId, name})=>{
            setAllClient((prev)=>{
              return prev.filter((client)=> client.socketId !== socketId)
            })
            toast.success(`${name} Leaved this Room 😐`)
          })
        }
        init();
        return ()=> {
          socketRef.current.off(ACTION.JOINED)
          socketRef.current.off(ACTION.DISCONNECTED)
          socketRef.current.disconnect();
        }
      },[])
      
      if(!location.state){
        return(<Navigate to={"/"}/>) 
      }
  return (
    <div className="main-wrapper">
      <div className="aside-wrapper">
        <EditorPageAside socketRef = {socketRef}  onLangChange={(lang)=> {langRef.current = lang }} clients = {allClient} roomId = {roomId}/>
      </div>
      <div className="editor-wrapper">
        <Editor socketRef = {socketRef} roomId = {roomId} onCodeChange={(code)=> {codeRef.current = code }} clients = {allClient}/>
      </div>
    </div>
  )
}
export default connect(null,mapDispatchToProps)(EditorPage)