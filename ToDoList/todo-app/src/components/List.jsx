import React from 'react'
import Card from './Card'

const List = () => {
  const todoList = [
    { id : 1, name: '할 일 1', status : false },
    { id : 2, name: '할 일 2', status : false },
    { id : 3, name: '할 일 3', status : true },
    { id : 4, name: '할 일 4', status : false },
    { id : 5, name: '할 일 5', status : false },
    { id : 6, name: '할 일 6', status : true },
    { id : 7, name: '할 일 7', status : false },
    { id : 8, name: '할 일 8', status : false },
    { id : 9, name: '할 일 9', status : true },
    { id : 10, name: '할 일 10', status : false },
  ]

  return (
    <div className='todoList'>
      {
        todoList.length > 0 ? 
        (
          // 데이터가 있을 때 표시
          <ul className='initial-list'>
            {
              todoList.map((todo) => (
                <Card key={todo.id} todo={todo} />
              ))
            }
          </ul>
        )
        :
        (
          // 데이터가 없을 때 표시
          <div className='empty-state'>
              <div className="empty-message">
                <h3>할 일이 없습니다.</h3>
                <p>새로운 할 일을 추가해보세요</p>
              </div>
          </div>
        )
      } 
    </div>
  )
}

export default List 