package com.aloha.board.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.board.dto.Boards;

@Mapper
public interface BoardMapper extends BaseMapper<Boards> {
    
}
