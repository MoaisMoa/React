import React, { createContext, useCallback, useEffect, useState } from 'react'
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

    // Login Setting
   const loginSetting = useCallback((userData) => {
    setIsLogin(true)
    setUserInfo(userData)
    // 권한 Setting
   }, [])

   // 로그인 요청 함수 정의
   const login = async (username, password) => {
    try {
        const response = await auth.login(username, password)
        const { data, headers } = response
                const authorization = headers.authorization ?? headers.Authorization
                const jwt = authorization?.replace(/^Bearer\s+/i, '').trim()

                if (!jwt) {
                    throw new Error('JWT not found in login response header')
                }

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

   /* 자동 로그인 함수
    - 컴포넌트가 마운트(업데이트)될 때, JWT로 로그인 상태를 유지하도록 실행 */
   const autoLogin = useCallback(async () => {
    const jwt = Cookies.get('jwt')

    if(!jwt) {
        setIsLoading(false)
        return 
    }

    try {
        const response = await auth.info()
        if(response.status == 200 && response.data !== 'UNAUTHORIZED'){
            loginSetting(response.data)
        }
    } catch (error) {
        console.error('자동 로그인 실패 : ',error);
        Cookies.remove('jwt')
    } finally {
        setIsLoading(false)
    }
   }, [loginSetting])

   useEffect(() => {
    autoLogin()
   }, [autoLogin])

  return (
    // Provider 정의
    <LoginContext.Provider value={{ isLoading, isLogin, userInfo, roles, login }}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider