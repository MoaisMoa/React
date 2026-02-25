package com.aloha.board.controller;

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

@CrossOrigin (
    // origins = {
    // "http://localhost:3000",
    // "http://localhost:5173"
    // }
    "*"
)
@Controller
@RequiredArgsConstructor
@RequestMapping("/")
public class BoardController {
    
    private final BoardService boardService;

    // 목록, 조회, 등록, 수정, 삭제

    // 목록    
    @GetMapping()
    public ResponseEntity<?> getAll(
        @RequestParam(defaultValue = "1", required = false) int page,
        @RequestParam(defaultValue = "5", required = false) int size,
        Pagination pagination) {
            try {
                PageInfo<Boards> pageInfo = boardService.list(page, size);
                return new ResponseEntity<>(pageInfo, HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
         }

     // 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable String id) {
        try {
            return new ResponseEntity<>("GetOne Result", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 등록
    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Boards boards) {
        try {
            return new ResponseEntity<>("Create Result", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 수정
    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Boards boards) {
        try {
            return new ResponseEntity<>("Update Result", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable String id) {
        try {
            return new ResponseEntity<>("Destroy Result", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } 
}
