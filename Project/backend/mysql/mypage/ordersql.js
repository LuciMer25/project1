module.exports = {
    orderList: `select o.order_no, o.order_state, ods.order_date, od.price, o.addr, o.detail_addr, o.user_id,
                           min(od.prod_img) as first_prod_img, 
                           min(od.prod_name) as first_prod_name, 
                           count(od.prod_no) -1 as prod_cnt 
                    from orders o join order_detail od 
                                  on o.order_no = od.order_no 
                                  join order_state ods 
                                  on o.order_no = ods.order_no 
                    where (o.order_state = "상품준비중" or o.order_state = "배송중" or o.order_state = "배송완료" 
                          or o.order_state = "취소요청" or o.order_state = "반품요청" or o.order_state = "구매확정"
                          or o.order_state = "취소완료" or o.order_state = "반품완료")
                          and o.user_id = ?
                    group by o.order_no, o.order_state, ods.order_date, od.price
                    order by o.order_no desc`,
    cancelOrder: `UPDATE orders
                  SET order_state = "취소요청"
                  WHERE order_no = ?`,
    returnOrder: `UPDATE orders
                   SET order_state = '반품요청'
                   WHERE order_no = ?`,
    orderConfirm: `UPDATE orders
                   SET order_state = '구매확정' 
                   WHERE order_no = ?`,
    updateConfirmState: `UPDATE order_state
                         SET buy_complete_date = CURRENT_TIMESTAMP
                         WHERE order_no = ?`,
    cancelRevoke: `UPDATE orders
                   SET order_state = '상품준비중'
                   WHERE order_no = ?
                   AND order_state = '취소요청'`,
    updateCancelState: `UPDATE order_state
                   SET cancel_req_date = CURRENT_TIMESTAMP
                   WHERE order_no = ?`,
    returnCancel: `UPDATE orders
                   SET order_state = '배송완료'
                   WHERE order_no = ?
                   AND order_state = '반품요청'`,
    updateReturnState: `UPDATE order_state
                   SET return_req_date = CURRENT_TIMESTAMP
                   WHERE order_no = ?`,
    myPageOrderProdDetail : `SELECT od.prod_name, od.prod_img, od.prod_no, od.price, od.prod_cnt, od.prod_img, od.order_amount
                   FROM order_detail od JOIN orders o
                                     on o.order_no = od.order_no
                   WHERE o.user_id = ?
                   AND o.order_no = ?`,

    myPageOrderUserDetail : `SELECT o.order_no, o.order_total_amount, o.addr, o.waybill_no, o.post_no, o.detail_addr, o.name, o.phone_no, os.order_date, o.paytype, os.cancel_req_date, os.cancel_complete_date, os.return_req_date, os.return_complete_date, os.buy_complete_date
                   FROM orders o JOIN order_state os
                              ON o.order_no = os.order_no
                   WHERE o.user_id = ?
                   AND o.order_no = ?`,

    myPageCancelUserDetail : `SELECT o.order_no, o.order_total_amount, o.addr, os.cancel_req_date, os.cancel_complete_date, o.post_no, o.detail_addr, o.name, o.phone_no, o.paytype
                              FROM orders o JOIN order_state os
                                            ON o.order_no = os.order_no
                              WHERE o.order_no = ?`,

    myPageReturnUserDetail : `SELECT o.order_no, o.order_total_amount, o.addr, os.return_req_date, os.return_complete_date, o.post_no, o.detail_addr, o.name, o.phone_no, o.paytype
                              FROM orders o JOIN order_state os
                                            ON o.order_no = os.order_no
                              WHERE o.order_no =?`
}