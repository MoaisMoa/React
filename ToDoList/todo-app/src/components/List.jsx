import React from 'react'
import Card from './Card'
import SkeletonCard from './SkeletonCard'

const List = ({ todoList, onToggle, onDelete, loading }) => {

  return (
    <div className='todoList'>
      {
        loading
        ?
        (
          <ul className='initial-list'>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </ul>
        )
        : todoList.length > 0 ? 
        (
          // 데이터가 있을 때 표시
          <ul className='initial-list'>
            {
              todoList.map((todo) => (
                <Card key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
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