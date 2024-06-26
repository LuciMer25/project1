module.exports = {
    mypageorder: `select o.order_no, o.order_state, ods.order_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, 
                            min(od.prod_img) as first_prod_img, 
                            min(od.prod_name) as first_prod_name, 
                            count(od.prod_no) -1 as prod_cnt 
                      from orders o join order_detail od 
                                    on o.order_no = od.order_no 
                                    join order_state ods 
                                    on o.order_no = ods.order_no 
                                    where o.order_state = "상품준비중" or o.order_state = "배송중" 
                      group by o.order_no, o.order_state, ods.order_date`
}