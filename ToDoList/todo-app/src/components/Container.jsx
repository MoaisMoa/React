import React, {useEffect, useState} from 'react'
import Header from './Header'
import Input from './Input'
import List from './List'
import Footer from './Footer'

const Container = () => {
  // state
  const [todoList, setTodoList] = useState([])

  // 데이터 목록 요청
  const getList = () => {
    console.log('할 일 목록 데이터를 요청합니다.');
    const url = 'http://localhost:8080/todos'
    fetch(url)
      .then( response => response.json() )
      .then( data => {
        console.log('응답 데이터 : ', data);
        setTodoList(data.list)
      })
      .catch( error => {
        console.error('error : ', error);
      })
  }
  
  // 컴포넌트가 마운트 될 때, 할 일 목록 요청
  useEffect(() => {
    getList()
  }, [])
  

  return (
    <div className='container'>
      <Header />
      <Input />
      <List 
        todoList={todoList}
      />
      <Footer />
    </div>
  )
}

export default Container 