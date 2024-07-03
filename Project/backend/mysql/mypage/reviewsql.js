module.exports = {
    reviewList: `select r.review_no, r.score, r.review_title, r.review_content, r.reg_date, r.user_id, o.order_no, r.review_img, p.prod_no
                 from review r join product p
                 on r.prod_no = p.prod_no
                 join orders o
                 on r.order_no = o.order_no
                 where r.user_id = ?
                 group by r.review_no, r.score, r.review_title, r.review_content, r.reg_date, r.user_id, o.order_no, r.review_img, p.prod_no`,
    reviewInfo: `select r.review_no, r.score, r.review_title, r.review_content, r.reg_date, r.user_id, o.order_no, r.review_img, p.prod_no
                 from review r join product p
                 on r.prod_no = p.prod_no
                 join orders o
                 on r.order_no = o.order_no
                 where r.review_no = ?
                 group by r.review_no, r.score, r.review_title, r.review_content, r.reg_date, r.user_id, o.order_no, r.review_img, p.prod_no`,
    reviewUpdate: `UPDATE review
                   SET  review_title = ?, review_content = ?, score = ?, reg_date = CURRENT_TIMESTAMP
                   WHERE review_no = ?`,
    reviewInsert: `INSERT INTO review
                   SET ?`,
    reviewDelete: `DELETE
                   FROM review
                   WHERE review_no = ?`,
    productReviews: `SELECT score,
                            review_title, 
                            review_content, 
                            user_id, 
                            review_img,
                            reg_date
                     FROM review
                     WHERE prod_no=?
                     ORDER BY reg_date desc`
}