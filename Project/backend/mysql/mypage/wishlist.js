module.exports = {
    wishList: `select w.wish_no, p.prod_img , p.prod_name, p.price, p.prod_no
               from wishlist w join product p
               on w.prod_no = p.prod_no
               where w.user_id = ?`,
    delWish:`DELETE 
             FROM wishlist 
             WHERE wish_no = ?`
}