package com.aloha.board.dto;

import lombok.Data;

@Data
public class Pagination {
    //페이징 기본값
    private static final long PAGE = 1;     //현재 페이지 번호 기본값
    private static final long SIZE = 10;     //페이지당 데이터 수 기본값
    private static final long COUNT = 10;    //노출 페이지 수 기본값

    //필수 정보
    private long page;      //현재 번호
    private long size;      //페이지당 데이터 수
    private long count;     //노출 페이지 수
    private long total;     //데이터 수

    //수식 정보
    private long start;     //시작 번호
    private long end;       //끝 번호
    private long first;     //첫 번호
    private long last;      //마지막 번호
    private long prev;      //이전 번호
    private long next;      //다음 번호
    private long index;     //순서 번호

    /* ==============생성자=============== */
    public Pagination() {
        this(0);
    }

    public Pagination(long total) {
        this(PAGE, total);
    }

    public Pagination(long page, long total) {
        this(page, SIZE, COUNT, total);
    }

    public Pagination(long page, long size, long count, long total) {
        this.page = page;
        this.size = size;
        this.count = count;
        this.total = total;
        calc();
    }

    //페이징 처리 수식
    public void calc() {
        this.first = 1; //첫 번호
        this.last = (this.total - 1) / size + 1; //마지막 번호
        this.start = ((page-1)/count) * count + 1; //시작 번호
        //끝 번호
        this.end = ((page-1)/count + 1) * count;
        this.end = Math.min(this.end, this.last);

        this.prev = this.page - 1;  //이전 번호
        this.next = this.page + 1;  //다음 번호
        this.index = (this.page - 1) * this.size; //데이터 순서 번호
    }


    /**
     * setter
     * => 데이터 수 지정 후, 페이징 수식 재계산
     * @param total
     */

    public void setTotal(long total) {
        this.total = total;
        calc();
    }
}
