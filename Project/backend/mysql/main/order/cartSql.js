module.exports = {
    addCart : `INSERT INTO cart (prod_cnt, prod_no, user_id)
               VALUES (?, ?, ?)
               ON DUPLICATE KEY 
               UPDATE prod_cnt = prod_cnt + VALUES(prod_cnt)`,
    cartList : `SELECT c.cart_no, 
                       c.prod_cnt, 
                       c.prod_no, 
                       p.prod_name, 
                       p.price, 
                       p.prod_img 
                FROM cart c JOIN product p 
                ON c.prod_no = p.prod_no
                WHERE c.user_id = ?`,
    deleteItem:`DELETE 
                FROM cart 
                WHERE cart_no = ?`,    
    deleteItems: `DELETE 
                  FROM cart 
                  WHERE cart_no IN (?)`, // 다건 삭제 쿼리 추가
    batchUpdate: (items) => {
        return items.map(item => 
            `UPDATE cart SET prod_cnt = ${item.prod_cnt} WHERE cart_no = ${item.cart_no};`
        ).join(' ');
        }
}


