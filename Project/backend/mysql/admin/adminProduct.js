module.exports = {
     prodList: `SELECT p.*, c.ctgr_name 
                FROM product p JOIN category c 
                ON p.ctgr_no = c.ctgr_no`,
     
     prodInfo: `SELECT p.prod_no, p.prod_name, p.price, p.prod_img, p.reg_date, p.ctgr_no, 
                       c.ctgr_name AS ctgr_name,
                       tc.ctgr_name AS top_ctgr_name,
                       COALESCE(ROUND(r.avg_score, 1), 0) AS avg_score,
                       COALESCE(r.cnt, 0) AS cnt
                FROM product p LEFT JOIN (
                                          SELECT prod_no, 
                                                 AVG(score) AS avg_score, 
                                                 COUNT(*) AS cnt
                                          FROM review
                                          GROUP BY prod_no ) AS r 
                              ON p.prod_no = r.prod_no
                         LEFT JOIN category c
                              ON c.ctgr_no = p.ctgr_no
                         LEFT JOIN category tc
                              ON tc.ctgr_no = c.top_ctgr_no
                WHERE p.prod_no = ?;`,
     
     categoryList: `SELECT ctgr_no, ctgr_name, top_ctgr_no 
                    FROM category`,
     
     subCategory: `SELECT ctgr_no, ctgr_name 
                   FROM category 
                   WHERE top_ctgr_no = ?`,

     prodUpdate: `UPDATE product 
                  SET prod_name = ?, price = ?, ctgr_no = ?, prod_img = ?, prod_content_img = ?, reg_date = CURRENT_TIMESTAMP
                  WHERE prod_no = ?`,

     prodInsert: `INSERT INTO product (prod_name, price, ctgr_no, prod_img, prod_content_img)
                  VALUES (?, ?, ?, ?, ?)`,

     prodDelete: `DELETE FROM product
                  WHERE prod_no = ?`

   };