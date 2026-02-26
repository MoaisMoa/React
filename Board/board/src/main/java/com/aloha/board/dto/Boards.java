package com.aloha.board.dto;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class Boards {
    private Long no;
    private String id;
    private String title;
    private String writer;
    private String content;
    private Date createdAt;
    private Date updatedAt;

    // 파일
    private MultipartFile mainFile;
    private List<MultipartFile> files;

    // 파일 정보
    private Files file;             // 메인 파일 1:1 매핑
    private List<Files> fileList;   // 나머지 첨부 파일 1:N 매핑

    public Boards() {
        this.id = UUID.randomUUID().toString();
    }
}
