module.exports = {
    insertOrder : `INSERT INTO orders SET
                    order_total_amount = ?,
                    addr = ?,
                    detail_addr = ?,
                    post_no = ?,
                    user_id = ?,
                    pay_code = ?,
                    phone_no = ?,
                    name = ?,
                    paytype = ?`,
                    
    getOrderNum : `SELECT order_no 
                   FROM orders
                   WHERE pay_code = ?`,
    insertOrderState : `INSERT INTO order_state(order_no)
                        VALUES(?)`
}