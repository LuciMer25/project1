module.exports = {
    adminOrderList : `select o.order_no, o.order_state, ods.order_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, 
                            min(od.prod_img) as first_prod_img, 
                            min(od.prod_name) as first_prod_name, 
                            count(od.prod_no) -1 as prod_cnt 
                      from orders o join order_detail od 
                                    on o.order_no = od.order_no 
                                    join order_state ods 
                                    on o.order_no = ods.order_no 
                                    where o.order_state = "상품준비중" or o.order_state = "배송중" 
                      group by o.order_no, o.order_state, ods.order_date`,

    cancelOrderList : `select o.order_no, o.order_state, ods.cancel_req_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, 
                              min(od.prod_img) as first_prod_img, 
                              min(od.prod_name) as first_prod_name, 
                              count(od.prod_no) -1 as prod_cnt 
                       from orders o join order_detail od 
                                     on o.order_no = od.order_no 
                                     join order_state ods 
                                     on o.order_no = ods.order_no 
                       where o.order_state = "취소요청" 
                       group by o.order_no, o.order_state, ods.cancel_req_date`,
    
    returnOrderList : `select o.order_no, o.order_state, ods.return_req_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, 
                              min(od.prod_img) as first_prod_img, 
                              min(od.prod_name) as first_prod_name, 
                              count(od.prod_no) -1 as prod_cnt 
                       from orders o join order_detail od 
                                     on o.order_no = od.order_no 
                                     join order_state ods 
                                     on o.order_no = ods.order_no 
                       where o.order_state = "반품요청" or o.order_state = "반품완료" 
                       group by o.order_no, o.order_state, ods.return_req_date`,

    orderAllList : `select o.order_no, o.order_state, ods.order_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, 
                           min(od.prod_img) as first_prod_img, 
                           min(od.prod_name) as first_prod_name, 
                           count(od.prod_no) -1 as prod_cnt 
                    from orders o join order_detail od 
                                  on o.order_no = od.order_no 
                                  join order_state ods 
                                  on o.order_no = ods.order_no 
                    where o.order_state = "상품준비중" or o.order_state = "배송중" or o.order_state = "배송완료" 
                    group by o.order_no, o.order_state, ods.order_date`,

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
                     o.order_no, o.order_state, ods.cancel_req_date;`,

    updateCancelState : `UPDATE orders
                         SET order_state = "취소완료"
                         WHERE order_no = ?`,

    updateCancelComplete : `UPDATE order_state
                            SET cancel_complete_date = CURRENT_TIMESTAMP
                            WHERE order_no = ?`,



}