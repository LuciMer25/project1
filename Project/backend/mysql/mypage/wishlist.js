module.exports = {
    wishList: `select prod_img, prod_name, price, wish_no
                from product p join wishlist w
                on p.prod_no = w.prod_no`
}