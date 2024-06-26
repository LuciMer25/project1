module.exports = {
    qnaList : `select q.qna_no, q.user_id, q.qna_title, q.reg_date, q.comment_state, q.prod_no, p.prod_name as prod_name 
               from QnA q join product p 
                          on p.prod_no = q.prod_no 
               where comment_state = "답변 대기"`,

inquiryList : `select inquiry_no, inquiry_title, reg_date, comment_state, user_id 
               from inquiry 
               where comment_state = "답변 대기"`,

qnaAllList : `select q.qna_no, q.user_id, q.qna_title, q.reg_date, q.comment_state, q.prod_no, p.prod_name as prod_name 
              from QnA q join product p 
                         on p.prod_no = q.prod_no`,

inquiryAllList : `select inquiry_no, inquiry_title, reg_date, comment_state, user_id 
                  from inquiry`,

}