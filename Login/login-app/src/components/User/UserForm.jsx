import React from 'react'
import './UserForm.css'

const UserForm = () => {
  return (
    <div className="form">
        <h2 className="login-title">회원 정보</h2>
        <form className="login-form">
            {/* 아이디 */}
            <div>
                <label htmlFor="username">username</label>
                <input type="text"
                       id='username'
                       placeholder='username'
                       autoComplete='username'
                       required
                       readOnly
                />
            </div>
            {/* 비밀번호 */}
            <div>
                <label htmlFor="password">password</label>
                <input type="password"
                       id='password'
                       placeholder='password'
                       autoComplete='password'
                       required
                />
            </div>
            {/* 이름 */}
            <div>
                <label htmlFor="name">name</label>
                <input type="text"
                       id='name'
                       placeholder='name'
                       autoComplete='name'
                       required
                />
            </div>
            {/* 이메일 */}
            <div>
                <label htmlFor="email">email</label>
                <input type="text"
                       id='email'
                       placeholder='email'
                       autoComplete='email'
                       required
                />
            </div>
            <button type='submit' className='btn btn--form btn-login'>정보 수정</button>
            <button className='btn btn--form btn-login'>회원 탈퇴</button>
        </form>
    </div>
  )
}

export default UserForm