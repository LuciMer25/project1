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
    `SELECT p.prod_no, p.prod_name, p.price, p.reg_date, p.prod_img, coalesce(round(r.avg_score,1),0) as avg_score, coalesce(r.cnt,0) as cnt
     FROM product p
     LEFT JOIN (
         SELECT prod_no, AVG(score) AS avg_score, count(*) as cnt
         FROM review
         GROUP BY prod_no
     ) AS r 
     ON p.prod_no = r.prod_no
     WHERE reg_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()
     ORDER BY p.reg_date desc`,
};
