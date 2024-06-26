module.exports = {
    adminOrderList : 'select o.order_no, o.order_state, ods.order_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, min(od.prod_img) as first_prod_img, min(od.prod_name) as first_prod_name, count(od.prod_no) -1 as prod_cnt from orders o join order_detail od on o.order_no = od.order_no join order_state ods on o.order_no = ods.order_no where o.order_state = "상품준비중" or o.order_state = "배송중" group by o.order_no, o.order_state, ods.order_date',
    cancelOrderList : 'select o.order_no, o.order_state, ods.cancel_req_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, min(od.prod_img) as first_prod_img, min(od.prod_name) as first_prod_name, count(od.prod_no) -1 as prod_cnt from orders o join order_detail od on o.order_no = od.order_no join order_state ods on o.order_no = ods.order_no where o.order_state = "취소요청" group by o.order_no, o.order_state, ods.cancel_req_date',
    returnOrderList : 'select o.order_no, o.order_state, ods.return_req_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, min(od.prod_img) as first_prod_img, min(od.prod_name) as first_prod_name, count(od.prod_no) -1 as prod_cnt from orders o join order_detail od on o.order_no = od.order_no join order_state ods on o.order_no = ods.order_no where o.order_state = "반품요청" or o.order_state = "반품완료" group by o.order_no, o.order_state, ods.return_req_date',

    qnaList : 'select q.*, p.prod_name as prod_name from QnA q join product p on p.prod_no = q.prod_no where comment_state = "답변 대기"',
    inquiryList : 'select * from inquiry where comment_state = "답변 대기"',
    qnaAllList : 'select q.*, p.prod_name as prod_name from QnA q join product p on p.prod_no = q.prod_no',
    inquiryAllList : 'select * from inquiry',

    memberList : 'select * from user',
    memberCount : 'select count(*) cnt from user',

    prodList : 'select p.*, c.ctgr_name from product p join category c on p.ctgr_no = c.ctgr_no',


    orderAllList : 'select o.order_no, o.order_state, ods.order_date, o.waybill_no, o.user_id, o.addr, o.detail_addr, min(od.prod_img) as first_prod_img, min(od.prod_name) as first_prod_name, count(od.prod_no) -1 as prod_cnt from orders o join order_detail od on o.order_no = od.order_no join order_state ods on o.order_no = ods.order_no where o.order_state = "상품준비중" or o.order_state = "배송중" or o.order_state = "배송완료" group by o.order_no, o.order_state, ods.order_date',

}