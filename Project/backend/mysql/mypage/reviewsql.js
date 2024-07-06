module.exports = {
    // reviewList: `select p.prod_name, p.prod_img, score, review_no, review_title, review_content, review_img, r.user_id, order_state, o.order_no, od.review_avail
    //              from product p join review r
    //              on p.prod_no = r.prod_no
    //              join orders o
    //              on r.order_no = o.order_no
    //              join order_detail od
    //              on r.order_no = od.order_no
    //              where r.user_id = ?
    //              and order_state = '구매확정'
    //              and od.review_avail = 0
    //              group by p.prod_name, p.prod_img, score, review_no, review_title, review_content, review_img, r.user_id, order_state, o.order_no, od.review_avail`,
    reviewList: `select r.review_no, r.score, r.review_title, r.review_content, r.reg_date, r.user_id, o.order_no, r.review_img, p.prod_no
                 from review r join product p
                 on r.prod_no = p.prod_no
                 join orders o
                 on r.order_no = o.order_no
                 where r.user_id = ?
                 group by r.review_no, r.score, r.review_title, r.review_content, r.reg_date, r.user_id, o.order_no, r.review_img, p.prod_no`,
    reviewInfo: `select r.review_no, r.score, r.review_title, r.review_content, r.reg_date, r.user_id, o.order_no, r.review_img, p.prod_name, p.prod_img
                 from review r join product p
                 on r.prod_no = p.prod_no
                 join orders o
                 on r.order_no = o.order_no
                 where r.review_no = ?
                 group by r.review_no, r.score, r.review_title, r.review_content, r.reg_date, r.user_id, o.order_no, r.review_img, p.prod_name, p.prod_img`,
    reviewProductSel: `select od.prod_name, od.prod_no, o.order_no
                       from order_detail od join orders o
                       on od.order_no = o.order_no
                       where o.order_state = "구매확정"
                       and o.user_id = ?
                       and od.review_avail = 0`,
    reviewUpdate: `UPDATE review
                   SET  review_title = ?, review_content = ?, score = ?, reg_date = CURRENT_TIMESTAMP
                   WHERE review_no = ?`,
    reviewInsert: `INSERT INTO review(score, review_title, review_content, user_id, review_img, order_no, prod_no)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`,
    reviewDelete: `DELETE
                   FROM review
                   WHERE review_no = ?`,
    productReviews: `SELECT r.score,
                            r.review_title, 
                            r.review_content, 
                            r.user_id, 
                            r.review_img,
                            r.reg_date,
                            p.prod_name
                     FROM review r JOIN product p
                                   ON r.prod_no = p.prod_no
                     WHERE r.prod_no=?
                     ORDER BY r.reg_date desc`,
    changeReviewState: `UPDATE order_detail
		                SET review_avail = 1
		                WHERE order_no = ?`
}