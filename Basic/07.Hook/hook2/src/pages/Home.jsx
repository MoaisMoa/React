import React from 'react'
import { useState, useEffect } from 'react'
import TodoItem from '../components/TodoItem'
import { useMemo } from 'react'
import { useCallback } from 'react'

const Home = () => {
    //State 선언 
    const [todos, setTodos] = useState(

        // 로컬스토리지에 저장 되어 있는 값 불러옴!!
        () => {
            const saved = localStorage.getItem("todos");
            return saved ? JSON.parse(saved) : [];
        }
    ) // 할 일 목록

    const [text, setText] = useState("")        // 새로운 할 일 입력
    const [search, setSearch] = useState("")    // 검색어 입력

    // ############# 이벤트 핸들러 ##############

    // - 할 일 완료 토글
    // const handleToggle = (id) => {
    //     const newTodos = todos.map( todo =>
    //         todo.id === id ? { ...todo, completed: !todo.completed } : todo
    //     )

    //     // 상태 업데이트 : 호출 되는 순간 리렌더링 시키는거얌
    //     setTodos ( newTodos )
    // }
    const handleToggle = useCallback((id) => {
        setTodos(
            prev => prev.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
        );
    }, []);

    // - 할 일 삭제
    // const handleDelete = (id) => {
    //     const newTodos = todos.filter(todo => todo.id !== id)

    //     // 상태 업데이트
    //     setTodos(newTodos)
    // }
    const handleDelete = useCallback((id) => {
        // 상태 업데이트
        setTodos(
            prev => prev.filter(todo=> todo.id !== id)
        )
    }, [],)

    // - 할 일 추가
    // const handleAdd = () => {
    //     // 입력 값이 없으면 추가 X
    //     if (!text.trim()) return

    //     const newTodos = [
    //         ...todos,
    //         { id: Date.now(), text: text, completed: false }
    //     ]

    //     // 상태 업데이트
    //     setTodos(newTodos)
    //     setText("")
    // }
    // - 할 일 추가 (ver.useCallback)
    const handleAdd = useCallback(() => {
        // 입력 값이 없으면 추가 X
        if (!text.trim()) return

        // 상태 업데이트
        setTodos(
            prev => [ ...prev, {id: Date.now(), text: text, completed: false }]
        );
        setText("")
    }, [text])


    // 할 일 전체 개수 와 완료된 개수
    // const total = todos.length;
    // const completed = todos.filter(todo => todo.completed).length;

    // => 위 코드를 useMemo() 를 사용해볼거야
    // useMemo() : 메모이제이션 기법을 적용해서 이전에 계산된 결과를 메모해놓고 재사용
    const stats = useMemo(() => {
        const total = todos.length
        const completed = todos.filter(todo => todo.completed).length;
        return {total, completed}
    }, [todos]); // todos가 변할 때마다 재계산함!! (이전에 했으면 안함)

    // 검색어가 포함된 할 일 목록
    const searchedTodos = todos.filter(todo => todo.text.includes(search)
    );

    // useEffect HOOKS 사용할거야!!!
    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos)) // 변화할 때마다 로컬스토리지에 저장한다.
    }, [todos]) // todos 상태가 변화할 때마다 실행됨
    

  return (
    <div>
        <h1>Todo List App</h1>
        <input type="text"
               placeholder='할 일 입력'
               value={text}
               onChange={e => setText(e.target.value)}/>
        <button onClick={handleAdd}>추가</button>

        <br /><br />

        <input type="text"
               value={search}
               placeholder='검색어를 입력하세요.'
               onChange={ e => setSearch(e.target.value) }
        />
        <h3>전체 : {stats.total} /  완료 : {stats.completed}</h3>

        {/* 반복문 */}
        {
            searchedTodos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle = { handleToggle }
                    onDelete = { handleDelete }
                />
            ))
        }
    </div>
  )
}

export default Home