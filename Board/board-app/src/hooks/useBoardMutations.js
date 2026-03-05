import { useMutation, useQueryClient } from "@tanstack/react-query"
import { boardsApi } from "../apis/boards"
import {useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { filesApi } from "../apis/files"

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

    // 글 수정
    const updateMutation = useMutation({
        mutationFn: ({ data, headers }) => boardsApi.update(data, headers),
        onSuccess: async (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['boards'] })
            if (variables?.data?.id) {
                queryClient.invalidateQueries({ queryKey: ['boards', variables.data.id] })
            }

            await $alert('수정 성공', '게시글 수정이 완료되었습니다.', 'success')
            navigate(variables?.data?.id ? `/boards/${variables.data.id}` : '/boards')
        }
    })

    // 단일 파일 삭제 remove: (id) => api.delete(`/files/${id}`),
    const deleteFileMutation = useMutation({
        mutationFn: (fileId) => filesApi.remove(fileId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['board', id]})
        }
    })

    // 파일 선택 삭제

    // checked 여부 확인해야하지 않ㅇ르까..? 리스트로 묶어야하지 않을까..?
    // => checked 여부는 update.jsx에서 하면 될듯?
    
    const deleteFilesMutation = useMutation({
        mutationFn: (idList) => filesApi.removeFiles(idList),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['board', id]})
        }
    })

    return {
        insertBoard: (data, headers) => insertMutation.mutate({ data, headers }),
        updateBoard: (data, headers) => updateMutation.mutate({ data, headers }),
        deleteFile : (fileId) => deleteFileMutation.mutate(fileId),
        deleteFiles: (idList) => deleteFilesMutation.mutate(idList),

        // isPending : 서버로 요청 보낸 후, 응답 대기 상태
        isInserting: insertMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteFileMutation.isPending,
    }
}