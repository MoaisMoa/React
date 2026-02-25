package com.aloha.board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.aloha.board.dto.Boards;
import com.aloha.board.mapper.BoardMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
	
	private final BoardMapper boardMapper;
	
	@Override
	public List<Boards> list() {
		List<Boards> list = boardMapper.list();
		return list;
	}

	@Override
	public PageInfo<Boards> list(int page, int size) {
		PageHelper.startPage(page, size);
		List<Boards> list = boardMapper.list();
		PageInfo<Boards> pageInfo = new PageInfo<>(list);

		pageInfo.getList().sort((t1, t2) -> {
			int seqCompare = t1.getNo().compareTo(t2.getNo());
			return seqCompare;
		});
		return pageInfo;
	}

	@Override
	public Boards select(Long no) {
		return boardMapper.select(no);
	}

	@Override
	public boolean insert(Boards boards){
		int result = boardMapper.insert(boards);
		return result > 0;
	}

	@Override
	public boolean update(Boards boards) {
        int result = boardMapper.update(boards);
        return result > 0;                                        
	}

	@Override
	public boolean delete(Long no) {
        int result = boardMapper.delete(no);
        return result > 0;
	}


}
