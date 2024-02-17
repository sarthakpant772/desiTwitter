import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const JWT = localStorage.getItem('JWT')

    return (
        JWT && JWT.length > 0 ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes
