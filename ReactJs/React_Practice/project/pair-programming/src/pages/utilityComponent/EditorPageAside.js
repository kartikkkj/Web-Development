import React,{useEffect, useRef, useState} from "react";
import logo from '../../assets/sale.png'
import Client from "./Client";
import { connect } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ACTION from "../../Actions";

const mapStateToProps = (state) => {
  return {
    Mymode: state.mode,
  };
};
const mapDispatchToProps=(dispatch)=>{
    return {
        chooseLang : (val) => dispatch({type:val})
    }
}

function EditorPageAside(props){
    const [clients, setClients] = useState([])
    const [lang, setLang] = useState()
    useEffect(()=>{
        setClients(props.clients)
    },[props.clients])
    function changeTheOption(e){
        const val = e.target.value;
        props.chooseLang(val)
        props.onLangChange(val)
        props.socketRef.current.emit(ACTION.LANG, {
            val,
            roomId:props.roomId,
        })
    }
    useEffect(()=>{
        if(props.socketRef.current){
            props.socketRef.current.on(ACTION.LANG, ({val})=>{
                props.chooseLang(val);
                setLang(val)
                })
            }
    },[props.socketRef.current])

    async function copyRoomId(){
        try{
            await window.navigator.clipboard.writeText(props.roomId)
            toast.success("Room Id Copied 🙂")
        }catch(err){
            toast.error("Could not Copy Room Id 😔")
            console.log(err);
        }
    }
    const navigator = useNavigate();
    function leaveRoom(){
        navigator("/")
    }
    return (
        <>
            <div className="aside-inner">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="language">
                    <h3>Connected</h3>
                    <select onChange={(e)=>changeTheOption(e)} name="lang" id="lang" value={lang}>
                        <option value="cpp">C++</option>
                        <option value="py">Python</option>
                        <option value="java">Java</option>
                        <option value="js">JavaScript</option>
                    </select>
                </div>
                <div className="clients-list">
                    {
                        clients.map((client) => (
                            <Client key={client.socketId} name={client.name} />
                        ))
                    }
                </div>
            </div>
            <button className="btn copy-btn" onClick={copyRoomId}>Copy ROOM ID</button>
            <button className="btn leave-btn" onClick={leaveRoom}>Leave</button>
        </>
    )
} 
 
export default connect(mapStateToProps,mapDispatchToProps)(EditorPageAside)