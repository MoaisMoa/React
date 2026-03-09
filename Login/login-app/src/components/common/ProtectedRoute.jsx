import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, roles: requiredRoles }) => {
    const { isLoading, isLogin, hasAnyRole } = useAuth()
    
    // 인증확인 (인증 안되어 있으면 login 화면으로 ㄱㄱ)
    if (!isLogin) { return <Navigate to="/login" /> }

    // 권한 확인 (권한 아니라면 login 화면으로 ㄱㄱ)
    if (requiredRoles && !hasAnyRole(...requiredRoles)) {
        return <Navigate to="/login" replace />
    }
    
    return children
}

export default ProtectedRoute