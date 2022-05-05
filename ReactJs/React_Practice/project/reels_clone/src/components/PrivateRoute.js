import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { Navigate } from "react-router-dom"
import Profile from '../components/Profile'
import Feed from './Feed'
export const PrivateRoute = ({element, ...rest }) => {
    const { user } = useContext(AuthContext)
    return  user ? <Feed/> : <Navigate to="/login" />
}
// export const PrivateRoute1 = ({element, ...rest }) => {
//     const { user } = useContext(AuthContext)
//     return  user ? <Profile/> : <Navigate to="/login" />
// }

