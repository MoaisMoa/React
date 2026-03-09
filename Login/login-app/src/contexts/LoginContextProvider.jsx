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

   /*
        권한 객체 리스트 파싱
            - authList [{no, username, auth}] 이거를 
              Set(auth) 이렇게
            - ("ROLE_USER", ...)
   */
   const parseRoles = (authList) => {
    if(!authList) return new Set()
        return new Set(authList.map((obj) => obj.auth))
   }
    // 권한 확인
    const hasRole = (role) => roles.has(role)
    const hasAnyRole = (...roleList) => roleList.some((role) => roles.has(role))

    // 로그인 Setting
   const loginSetting = useCallback((userData) => {
    setIsLogin(true)
    setUserInfo(userData)
    // 권한 Setting
    setRoles(parseRoles(userData.authList))
   }, [])

    // 로그아웃 Setting
   const logoutSetting = useCallback(() => {
    setIsLogin(false)
    setUserInfo(null)
    Cookies.remove('jwt')
    // 권한 Setting
    setRoles(new Set())
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

   // 로그아웃
   const logout = (force = false) => {
    if(force) {
        logoutSetting()
        navigate('/')
        return
    }
    Swal.confirm('로그아웃 하시겠습니까?','메인화면으로 이동합니다 ヾ(•ω•`)o','warning',
        (reslut) => {
            if(reslut.isConfirmed) {
                Swal.alert('로그아웃 성공', '로그아웃 되었습니다.','success')
                logoutSetting()
                navigate('/')
            }
        }
    )
   }

   // 마운트 시 자동 로그인
   useEffect(() => {
    autoLogin()
   }, [autoLogin])

  return (
    // Provider 정의
    <LoginContext.Provider value={{ isLoading, isLogin, userInfo, roles, login, hasRole, hasAnyRole, logout }}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider