import React  from 'react'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from '../thunk/actionsUser,';

function User({userData, fetchUsers}) {
    
    useEffect(() => {
       fetchUsers()
       
    }, [])
  return (
    <div>
      {
          userData.loading ? <h1>loading..............................</h1> : userData.error ? <h1>{userData.error}</h1>:
          userData.users.length>0 && 
          userData.users.map((user)=>(
             <h1 key={user.name} >{user.name}</h1>
         ))
      }
    </div>
  )
}

const mapStateToProps = (state)=>{
    return {
        userData : state
    }
   
}
const mapDispatchToProps = (dispatch)=>{
    return {
        fetchUsers : ()=> dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)