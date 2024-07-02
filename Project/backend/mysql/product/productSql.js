module.exports = {
    // 등록일(reg_date)기준 정렬 (최신순정렬)
    productNewList : 
    `select prod_no, prod_name, price, reg_date, prod_img
     from product
     order by reg_date desc`,
    // 등록일(reg_date)기준 정렬 (오래된순정렬)
    productOldList : 
    `select prod_no, prod_name, price, reg_date, prod_img
     from product
     order by reg_date`,
    // 신상품(등록일이 현재 날짜에서 한 달 전 날짜 까지 상품리스트)조회
    productRegiList : 
    `SELECT p.prod_no, p.prod_name, p.price, p.reg_date, p.prod_img, coalesce(round(r.avg_score,1),0) as review_avg_score, coalesce(r.cnt,0) as review_cnt
     FROM product p
     LEFT JOIN (
         SELECT prod_no, AVG(score) AS avg_score, count(*) as cnt
         FROM review
         GROUP BY prod_no
     ) AS r 
     ON p.prod_no = r.prod_no
     WHERE reg_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
     ORDER BY p.reg_date desc`,
     // 7일간 베스트 상품
     productBestList : 
     `SELECT DISTINCT p.prod_no,  p.prod_name,  p.price, p.reg_date, p.prod_img,  COALESCE(ROUND(r.avg_score, 1), 0) AS review_avg_score,  COALESCE(r.cnt, 0) AS review_cnt, od.order_cnt
        FROM product p
        LEFT JOIN (
            SELECT prod_no, AVG(score) AS avg_score, COUNT(*) AS cnt
            FROM review
            GROUP BY prod_no
        ) AS r 
        ON p.prod_no = r.prod_no
        LEFT JOIN (
            SELECT prod_no, COUNT(*) AS order_cnt
            FROM order_detail
            GROUP BY prod_no
        ) AS od 
        ON p.prod_no = od.prod_no
        LEFT JOIN (
            SELECT od.prod_no, os.order_date
            FROM order_detail od
            JOIN order_state os ON od.order_no = os.order_no
        ) AS os 
        ON od.prod_no = os.prod_no
        WHERE 
        os.order_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 WEEK) AND NOW()
        ORDER BY order_cnt desc`,
    productThreeList : 
        `SELECT p.prod_no, p.prod_name, p.price, p.reg_date, p.prod_img, coalesce(round(r.avg_score,1),0) as review_avg_score, coalesce(r.cnt,0) as review_cnt
        FROM product p
        LEFT JOIN (
            SELECT prod_no, AVG(score) AS avg_score, count(*) as cnt
            FROM review
            GROUP BY prod_no
        ) AS r 
        ON p.prod_no = r.prod_no
        WHERE reg_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
        AND
        prod_name LIKE '%3분%'
        ORDER BY p.reg_date desc`,
        cupbapList : 
        `SELECT p.prod_no, p.prod_name, p.price, p.reg_date, p.prod_img, coalesce(round(r.avg_score,1),0) as review_avg_score, coalesce(r.cnt,0) as review_cnt
        FROM product p
        LEFT JOIN (
            SELECT prod_no, AVG(score) AS avg_score, count(*) as cnt
            FROM review
            GROUP BY prod_no
        ) AS r 
        ON p.prod_no = r.prod_no
        WHERE reg_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
        AND
        prod_name LIKE '%컵밥%'
        ORDER BY p.reg_date desc`,
    bannerList : 
        `select b.banner_title, b.banner_img, b.prod_no, p.prod_name, p.price, p.prod_img
        from banner b join product p
        on b.prod_no = p.prod_no;`
};
