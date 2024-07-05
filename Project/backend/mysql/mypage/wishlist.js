module.exports = {
    wishList: `select w.wish_no, p.prod_img , p.prod_name, p.price
               from wishlist w join product p
               on w.prod_no = p.prod_no
               where w.user_id = ?`,
    addWish: `INSERT INTO wishlist (prod_no, wish_no, user_id)
               VALUES (?, ?, ?)`,
    delWish:`DELETE 
             FROM wishlist 
             WHERE wish_no = ?`
}