import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { Navigate } from "react-router-dom"
import { Route } from 'react-router-dom'
import Feed from './Feed'
const PrivateRoute = ({element, ...rest }) => {
    const { user } = useContext(AuthContext)
    return  user ? <Feed/> : <Navigate to="/login" />
}

export default PrivateRoute