module.exports = {
    wishList: `select w.wish_no, p.prod_img as wish_img , p.prod_name as wish_name , p.price as wish_price
               from wishlist w join product p
               on w.prod_no = p.prod_no
               where w.wish_no = ?
               group by w.wish_no, p.prod_img, p.prod_name, p.price`
}