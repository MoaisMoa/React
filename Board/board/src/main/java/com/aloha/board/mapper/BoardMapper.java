package com.aloha.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.board.dto.Boards;

@Mapper
public interface BoardMapper {
    // no, id, title, writer, content, createdAt, updatedAt
    
    // 목록, 조회, 등록, 수정, 삭제

    List<Boards> list();
    Boards select(Long no);
    int insert(Boards boards);
    int update(Boards boards);
    int delete(Long no);
}
