module.exports = {
    orderList: `SELECT order_no, order_total_amount, addr, order_state, post_no, waybill_no, post_no, detail_addr, 
                       user_id, pay_code
                FROM orders`,
    cancelOrder: `UPDATE orders
                  SET order_state = '취소요청'
                  WHERE order_no = ?`,
    returnOrderL: `UPDATE orders
                   SET order_state = '반품요청'
                   WHERE order_no = ?`,
    orderConfirm: `UPDATE orders
                   SET order_state = '구매확정'
                   WHERE order_no = ?`
}