package com.aloha.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.aloha.board.dto.Boards;
import com.aloha.board.dto.Pagination;
import com.aloha.board.service.BoardService;
import com.github.pagehelper.PageInfo;

import lombok.RequiredArgsConstructor;


@CrossOrigin ("*")
@Controller
@RequiredArgsConstructor
@RequestMapping("/boards")
public class BoardController {
    
    private final BoardService boardService;

    @GetMapping()
    public ResponseEntity<?> getAll(
        @RequestParam(value = "page", required = false, defaultValue = "1") int page,
        @RequestParam(value = "size", required = false, defaultValue = "10") int size,
        Pagination pagination
    ) {
        try {
            PageInfo<Boards> pageInfo = boardService.page(page, size);
            pagination.setPage(page);
            pagination.setSize(size);
            pagination.setTotal(pageInfo.getTotal());
            Map<String, Object> response = new HashMap<>();
            response.put("list", pageInfo.getList());
            response.put("pagination", pagination);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") String id) {
        try {
            Boards board = boardService.selectById(id);
            return new ResponseEntity<>(board, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Boards board) {
        try {
            boolean result = boardService.insert(board);
            if ( result )
            return new ResponseEntity<>(board, HttpStatus.OK);
            else
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Boards board) {
        try {
            boolean result = boardService.updateById(board);
            if ( result )
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            else
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable("id") String id) {
        try {
            boolean result = boardService.deleteById(id);
            if ( result )
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            else
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
