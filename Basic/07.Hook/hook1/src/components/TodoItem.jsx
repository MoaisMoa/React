import React from 'react'

const TodoItem = ({todo, onToggle, onDelete}) => {
  return (
    <div>
        <input type="checkbox"
               checked={todo.completed}

               //onToggle()만 호출하면 문제 생김. 익명 함수 사용해서 연결할 것.
               onChange={() => onToggle(todo.id)}/> 
               
        <span>
            {todo.text} 
        </span>
        <button onClick={()=>onDelete(todo.id)}>삭제</button>
    </div>
  )
}

export default TodoItem