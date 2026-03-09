import React, { createContext, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as auth from '../apis/auth'
import * as Swal from '../apis/alert'
import Cookies from 'js-cookie'

// Context 생성
export const LoginContext = createContext()

const LoginContextProvider = ({ children }) => {
   const [isLoading, setIsLoading] = useState(true) 
   const [isLogin, setIsLogin] = useState(false)
   const [userInfo, setUserInfo] = useState(null)
   const [roles, setRoles] = useState(new Set())
   
   const navigate = useNavigate()

   // 로그인 요청 함수 정의
   const login = async (username, password) => {
    try {
        const response = await auth.login(username, password)
        const { data, headers } = response
        const authorization = headers.authorization
        const jwt = authorization.replace('Bearer', '')

        // 쿠키에 JWT 저장
        Cookies.set('jwt', jwt, { expires: 5 })

        // 로그인 상태 설정 (isLogin State)
        loginSetting(data)


        Swal.alert('로그인 성공', '메인 화면으로 이동합니다.','success',
            () => navigate('/')
        )
    } catch (error) {
        Swal.alert('로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다.', 'error')
    }
   }

   // Login Setting
   const loginSetting = useCallback((userData) => {
    setIsLogin(true)
    setUserInfo(userData)
    // 권한 Setting
   }, [])

  return (
    // Provider 정의
    <LoginContext.Provider value={{ isLoading, isLogin, userInfo, roles, login }}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider