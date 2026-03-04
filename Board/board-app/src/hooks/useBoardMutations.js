import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { boardsApi } from "../apis/boards"
import {useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

// 공통 성공 alert
const $alert = (title, text, icon) =>
    Swal.fire({
        title,
        text,
        icon: icon,
        confirmButtonText: '확인',
        confirmButtonColor: '#3b82f6'
    })

export const useBoardMutations = (id) => {
    // 리액트 쿼리의 클라이언트 생성 하기 위한 훅
    const queryClient = useQueryClient()

    // 리액트 라우터로 페이지 이동을 하기 위한 훅(중요! 많이 사용함)
    const navigate = useNavigate()

    /* 글 등록을 하기 위한 API 요청
        useMutation : 데이터 변경하는 작업을 수행 하는 React Query 훅
    */
    const insertMutation = useMutation({
        mutationFn: ( {data, headers} ) => boardsApi.insert(data, headers),

        /* "요청 성공 시" 실행되는 콜백 함수 */
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] })
            
            // SweetAlert2
            await $alert('등록 성공', '게시글 등록이 완료되었습니다.', 'success')

            // 게시글 등록 후 목록 페이지로 이동!!
            navigate('/boards')
        }
    })
    return {
        insertBoard: (data, headers) => insertMutation.mutate({ data, headers }),

        // isPending : 서버로 요청 보낸 후, 응답 대기 상태
        isInserting: insertMutation.isPending,
    }
}