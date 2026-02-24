import React, {useEffect, useState} from 'react'
import Header from './Header'
import Input from './Input'
import List from './List'
import Footer from './Footer'

const Container = () => {
  // state
  const [input, setInput] = useState('')
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

  // 할 일 등록
  const onSubmit = async (e) => {
    // 기본 이벤트 동작 방지
    e.preventDefault();
    let name = input
    if (input=='') name = "제목 없음";

    // 데이터 등록 요청
    const data = {
      name : name,
      status : false,
      seq : 1
    }
    const option = {
      method : 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(data)
    }
      try {
        const url = 'http://localhost:8080/todos'
        const response = await fetch(url, option)
        const msg = await response.text()
  
        // 할 일 등록 성공시.. 
        if (response.ok){
          console.log('할 일 등록 추가');
          getList()
          setInput('')
        } else {
          console.log('할 일 등록 실패');
        }
        // 할 일 등록 실패시..
    } catch(error) {
      console.error(error);
    }
  }

  // 할 일 입력 변경 함수
  const onChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  }
  
  // 할 일 완료
  const onToggle = async (todo) => {
    // 할 일 완료 수정 요청
    const data = {
      ...todo,
      status: !todo.status
    }
    const option = {
      method: 'PUT',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(data)
    }
    try {
      const url = 'http://localhost:8080/todos'
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log('응답 메시지 : ', msg);
      if( response.ok ) {
        console.log('할 일 수정 성공');
        getList() // 목록 갱신!
      } else {
        console.log('할 일 수정 실패');
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 할 일 삭제
  const onDelete = async (id) => {
    const option = {
      method : 'DELETE',
      headers: {
        'Content-Type' : 'application/json'}
    }
    try {
      const url = `http://localhost:8080/todos/${id}`
      const response = await fetch(url, option)
      const msg = await response.text()

      console.log('응답 메세지 : ',msg);

      if (response.ok){
        console.log('삭제 완료');
        getList();
      } else {
        console.log('삭제 실패')
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 할 일 전체 완료
  const onCompleteAll = async() => {
    const url = 'http://localhost:8080/todos/bulk'
    const option = { method: 'PUT' }
    try {
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log('응답 메세지 : ', msg);

      if (response.ok){
        console.log('전체 완료 성공');
        getList();
      } else {
        console.log('전체 완료 실패')
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 할 일 전체 삭제
  const onRemoveAll = async() => {
    const url = 'http://localhost:8080/todos/bulk'
    const option = { method: 'DELETE' }
    try {
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log('응답 메세지 : ', msg);

      if (response.ok){
        console.log('전체 삭제 완료');
        getList();
      } else {
        console.log('전체 삭제 실패')
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 컴포넌트가 마운트 될 때, 할 일 목록 요청
  useEffect(() => {
    getList()
  }, [])
  

  return (
    <div className='container'>
      <Header />
      <Input input={ input } onChange={ onChange } onSubmit={ onSubmit }/>
      <List 
        todoList={todoList}
        onToggle={onToggle}
        onDelete={onDelete}
      />
      <Footer onCompleteAll={onCompleteAll}
              onRemoveAll={onRemoveAll}/>
    </div>
  )
}

export default Container 