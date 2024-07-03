module.exports = {
    adminOrderList : `select o.order_no, o.order_state, ods.order_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, 
                            min(od.prod_img) as first_prod_img, 
                            min(od.prod_name) as first_prod_name, 
                            count(od.prod_no) -1 as prod_cnt 
                      from orders o LEFT join order_detail od 
                                    on o.order_no = od.order_no 
                                    LEFT join order_state ods 
                                    on o.order_no = ods.order_no 
                                    where o.order_state = "상품준비중" or o.order_state = "배송중" 
                      group by o.order_no, o.order_state, ods.order_date
                      order by o.order_state desc`,

    cancelOrderList : `select o.order_no, o.order_state, ods.cancel_req_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, 
                              min(od.prod_img) as first_prod_img, 
                              min(od.prod_name) as first_prod_name, 
                              count(od.prod_no) -1 as prod_cnt 
                       from orders o join order_detail od 
                                     on o.order_no = od.order_no 
                                     join order_state ods 
                                     on o.order_no = ods.order_no 
                       where o.order_state = "취소요청" 
                       group by o.order_no, o.order_state, ods.cancel_req_date
                       order by o.order_state desc`,
    
    returnOrderList : `select o.order_no, o.order_state, ods.return_req_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, 
                              min(od.prod_img) as first_prod_img, 
                              min(od.prod_name) as first_prod_name, 
                              count(od.prod_no) -1 as prod_cnt 
                       from orders o join order_detail od 
                                     on o.order_no = od.order_no 
                                     join order_state ods 
                                     on o.order_no = ods.order_no 
                       where o.order_state = "반품요청" or o.order_state = "반품완료" 
                       group by o.order_no, o.order_state, ods.return_req_date
                       order by o.order_state desc`,

    orderAllList : `select o.order_no, o.order_state, ods.order_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, 
                           min(od.prod_img) as first_prod_img, 
                           min(od.prod_name) as first_prod_name, 
                           count(od.prod_no) -1 as prod_cnt 
                    from orders o join order_detail od 
                                  on o.order_no = od.order_no 
                                  join order_state ods 
                                  on o.order_no = ods.order_no 
                    where o.order_state = "상품준비중" or o.order_state = "배송중" or o.order_state = "배송완료" 
                    group by o.order_no, o.order_state, ods.order_date
                    order by o.order_state desc`,

    updateWayBill : `UPDATE orders 
                      SET waybill_no = ? , order_state ='배송중' 
                      where order_no = ?`,

    updateStateSchedule : `UPDATE orders
                            SET order_state = "배송완료"
                            WHERE order_no = ?`,

    updateOrderState : `UPDATE orders
                        SET order_state = "배송완료" 
                        WHERE order_no = ?`,

    cancelALLList : `select o.order_no, o.order_state, ods.cancel_req_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, 
                            min(od.prod_img) as first_prod_img, 
                            min(od.prod_name) as first_prod_name, 
                            count(od.prod_no) -1 as prod_cnt
                     from orders o join order_detail od 
                                   on o.order_no = od.order_no
                                   join order_state ods on o.order_no = ods.order_no
                     where o.order_state = '취소요청' or o.order_state = '취소완료'
                     group by
                     o.order_no, o.order_state, ods.cancel_req_date
                     order by o.order_state desc`,

    updateCancelState : `UPDATE orders
                         SET order_state = "취소완료"
                         WHERE order_no = ?`,

    updateCancelComplete : `UPDATE order_state
                            SET cancel_complete_date = CURRENT_TIMESTAMP
                            WHERE order_no = ?`,

    updateReturnState : `UPDATE orders
                        SET order_state = "반품완료" 
                        WHERE order_no = ?`,

    updateReturnComplete : `UPDATE order_state
                            SET return_complete_date = CURRENT_TIMESTAMP
                            WHERE order_no = ?`,
//     orderDetail : `SELECT od.prod_name, od.prod_img, od.prod_no, od.price, o.*, od.prod_cnt, order_amount, os.order_date
// 	            FROM order_detail od JOIN orders o
// 				            ON o.order_no = od.order_no
// 					     JOIN order_state os
//                                         ON o.order_no = os.order_no
// 	            AND o.order_no = ?`

    orderProdDetail : `SELECT od.prod_name, od.prod_img, od.prod_no, od.price, od.prod_cnt, od.prod_img, od.order_amount
                       FROM order_detail od JOIN orders o
			         		  on o.order_no = od.order_no
                       AND o.order_no = ?`,
    
    orderUserDetail : `SELECT o.order_no, o.order_total_amount, o.addr, o.waybill_no, o.post_no, o.detail_addr, o.name, o.phone_no, os.order_date, o.paytype
                       FROM orders o JOIN order_state os
			                ON o.order_no = os.order_no
                       AND o.order_no = ?`,
    
    cancelUserDetail : `SELECT o.order_no, o.order_total_amount, o.addr, os.cancel_req_date, os.cancel_complete_date, o.post_no, o.detail_addr, o.name, o.phone_no, o.paytype
                        FROM orders o JOIN order_state os
			                 ON o.order_no = os.order_no
                        AND o.order_no = ?`,

    returnUserDetail : `SELECT o.order_no, o.order_total_amount, o.addr, os.return_req_date, os.return_complete_date, o.post_no, o.detail_addr, o.name, o.phone_no, o.paytype
                        FROM orders o JOIN order_state os
			                 ON o.order_no = os.order_no
                        AND o.order_no =?`,

    todayTotalAmount : `SELECT DATE(ods.order_date) AS chart_date,
                               SUM(o.order_total_amount) AS chart_value
                        FROM orders o JOIN order_state ods 
			                 ON o.order_no = ods.order_no
                        WHERE DATE(ods.order_date) = CURRENT_DATE
                        AND o.order_state = '구매확정'
                        GROUP BY DATE(ods.order_date)
                        ORDER BY DATE(ods.order_date)`

}
