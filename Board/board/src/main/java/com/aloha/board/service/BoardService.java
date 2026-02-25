package com.aloha.board.service;

import java.util.List;

import com.aloha.board.dto.Boards;
import com.github.pagehelper.PageInfo;

public interface BoardService {
    // 목록, 조회, 등록, 수정, 삭제

    List<Boards> list();
    Boards select(Long no);
    boolean insert(Boards boards);
    boolean update(Boards boards);
    boolean delete(Long no);
    PageInfo<Boards> list(int page, int size);
}
