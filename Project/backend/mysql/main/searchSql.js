module.exports = {
    SearchResult : `SELECT p.prod_no, 
                           p.prod_name, 
                           p.price, 
                           p.reg_date, 
                           p.prod_img, 
                           coalesce(round(r.avg_score,1),0) as review_avg_score, 
                           coalesce(r.cnt,0) as review_cnt
                    FROM product p
                        LEFT JOIN (
                            SELECT prod_no, AVG(score) AS avg_score, count(*) as cnt
                            FROM review
                            GROUP BY prod_no
                        ) AS r 
                    ON p.prod_no = r.prod_no
                    WHERE prod_name LIKE ? 
                    ORDER BY p.reg_date desc`,
}