module.exports = {
    orderList: `select o.order_no, o.order_state, ods.order_date, od.price,
                           min(od.prod_img) as first_prod_img, 
                           min(od.prod_name) as first_prod_name, 
                           count(od.prod_no) -1 as prod_cnt 
                    from orders o join order_detail od 
                                  on o.order_no = od.order_no 
                                  join order_state ods 
                                  on o.order_no = ods.order_no 
                    where o.order_state = "상품준비중" or o.order_state = "배송중" or o.order_state = "배송완료" 
                          or o.order_state = "취소요청" or o.order_state = "반품요청" or o.order_state = "구매확정"
                          or o.order_state = "취소완료" or o.order_state = "반품완료"
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
    cancelRevoke: `UPDATE orders
                   SET order_state = '상품준비중'
                   WHERE order_no = ?
                   AND order_state = '취소요청'`,
    returnCancel: `UPDATE orders
                   SET order_state = '배송완료'
                   WHERE order_no = ?
                   AND order_state = '반품요청'`
}