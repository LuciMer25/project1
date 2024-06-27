module.exports = {
    getProductInfo : `SELECT p.prod_no, 
                             p.prod_name, 
                             p.price,
                             p.prod_img, 
                             coalesce(round(r.avg_score,1),0) as avg_score,
                             coalesce(r.cnt,0) as cnt
                      FROM product p
                                    LEFT JOIN (
                                                SELECT prod_no, 
                                                       AVG(score) AS avg_score, 
                                                       count(*) as cnt
                                                FROM review
                                                GROUP BY prod_no
                                            ) AS r 
                                    ON p.prod_no = r.prod_no
                      where p.prod_no=?`
}
