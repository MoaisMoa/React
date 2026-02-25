import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import SkeletonCard from './SkeletonCard'
import Page from './Page'
import { throttle } from 'lodash'

// Throttle
/* 
const throttle = (fn, delay) => {
  let timer = null
  return (...args) => {
    if(!timer) {
      timer = setTimeout(()=>{
        fn(...args)     // 원본 함수 호출
        timer = null    // 타이머 제거
      }, delay);
    }
  }
}
*/

const List = ({ todoList, onToggle, onDelete, loading, getList, initialPagination }) => {

  // 스크롤 컨테이너 참조
  const todoListRef = useRef(null)
  const prevScrollTop = useRef(0) // 이전 스크롤 위치

  // State
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지
  const [pages, setPages] = useState([])
  const [lastPage, setLastPage] = useState(initialPagination?.last || null ) // 마지막 페이지

  // ref
  const currentPageRef = useRef(currentPage)
  const lastPageRef = useRef(lastPage)
  const pagesRef = useRef(pages)

  useEffect(() => { currentPageRef.current = currentPage }, [currentPage])
  useEffect(() => { lastPageRef.current = lastPage }, [lastPage])
  useEffect(() => { pagesRef.current = pages }, [pages])
  

  useEffect(()=> {
    // 초기 데이터 페이지로 설정
    if( todoList.length > 0 || (todoList.length === 0) && initialPagination ){
      const initalPage = {
        pageNum: 0,
        data: todoList,
        pagination: initialPagination || {
          page: 1,
          size: initialPagination.size,
          total: initialPagination.total,
          count: initialPagination.count,
          start: initialPagination.start,
          end: initialPagination.end,
          first: 1,
          last: initialPagination.last,
        }
      }
      console.log(`초기 페이지 : ${initalPage}`);

      //초기 페이지가 이미 있는지 확인
      setPages(prev => {
        const hasInitialPage = prev.some(page => page.pageNum === initalPage.pageNum )
        if(hasInitialPage) {
          // 기존 초기 페이지 업데이트 
          return prev.map(page => page.pageNum === 0 ? initalPage : page)
        }
        else {
          // 새로운 페이지 추가
          return [initalPage, ...prev]
        }
      })
    }
  }, [todoList, initialPagination])

  // 다음 페이지 데이터 추가 함수
  const addPage = (pageNum) => {
    const loadedPages = pagesRef.current || []

    // 이미 불러온 페이지라면 스킵
    if (loadedPages.some(page => page.pageNum === pageNum )) {
      return
    }

    const url = `http://localhost:8080/todos?page=${pageNum}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('응답 데이터 : ', data);
        // data에는 { list : [], pagination :{ page, size, start, end, first, last, total } } 가 있겠지.

        // 마지막 페이지 정보 저장
        setLastPage(data.pagination.last)

        // 마지막 페이지 초과하면..중단!
        if(pageNum > data.pagination.last) {
          alert('마지막 페이지 입니다.')
          return
        }

        // 새로운 페이지 데이터 추가
        const newPage = {
          pageNum : pageNum,              // 현재 페이지
          data : data.list,               // 할 일 목록
          pagination : data.pagination    // 페이지 정보
        }

        setPages( prev => [...prev, newPage] )      // 이전 상태에 새 페이지 데이터 누적
        setCurrentPage(pageNum)   // 현재 페이지 Num을 지정
      })
      .catch(error => { console.error('다음 페이지 조회 실패:', error) })
  }

  // 스크롤 이벤트 핸들러

  useEffect(() => {
    const todoListElement = todoListRef.current
    
    const hadlerScroll = throttle( ()=> {
      const { scrollHeight, scrollTop, clientHeight } = todoListRef.current

      // 이전 스크롤보다 현재 스크롤 위치가 더 크면, 스크롤 아래
      const isScrollDown = scrollTop > prevScrollTop.current
      // 이전 스크롤 위치 업데이트
      prevScrollTop.current = scrollTop

      // 스크롤 맨 마지막 도달한다면..
      if( isScrollDown &&  clientHeight + scrollTop >= scrollHeight - 1 ) {
        const nextPage = currentPageRef.current + 1

        // 마지막 페이지 초과하면 다음 페이지 요청X
        if(lastPageRef.current === null || nextPage <= lastPageRef.current ){
          addPage(nextPage)
        }
        if( lastPageRef.current != null && nextPage > lastPageRef.current ) {
          alert('마지막 페이지 입니다.')
        }
      }
    }, 200)
    
    // 스크롤 이벤트 등록
    if ( todoListElement ) {
      todoListElement.addEventListener('scroll', hadlerScroll)
    }
  
    return () => {
      // 스크롤 이벤트 제거
      if ( todoListElement ) {
        todoListElement.removeEventListener('scroll', hadlerScroll)
      }
    }
  }, [])
  

  return (
    <div className='todoList' ref={todoListRef}>
      {
        loading
        ?
        (
          // 마운팅 전
          <ul className='initial-list'>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </ul>
        )
        :
        // 데이터가 있을 때
        pages.length > 0 ?
        (
          [...pages]
            .map(page => {
              const isInitalPage = page.pageNum === 0
              return (
                <Page
                    key = { `page-${page.pageNum}`}
                    page={page}
                    onToggle = { onToggle }
                    onDelete = { onDelete }
                    isInitalPage = { isInitalPage }
                    getList = { getList }
                />
              )
            })
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