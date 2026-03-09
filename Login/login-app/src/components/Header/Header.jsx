import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Header = () => {
    const { isLogin } = useAuth()

    return (
        <header>
            <div className="logo">
                <Link to='/'>
                    <img src="https://i.imgur.com/MlTTFsA.png" alt="logo" className='logo' />
                </Link>
            </div>
            <div className="uill">
                <ul>
                    {
                        isLogin
                        ?
                        <>
                            <li><Link to="/user">마이페이지</Link></li>
                            <li><button className='btn'>로그아웃</button></li>
                        </>
                        :
                        <>
                            <li><Link to="/login">로그인</Link></li>
                            <li><Link to="/join">회원가입</Link></li>
                            <li><Link to="/about">소개</Link></li>
                        </>
                    }
                </ul>
            </div>
        </header>
  )
}

export default Header