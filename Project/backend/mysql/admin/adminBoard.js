module.exports = {
    qnaList : `select q.qna_no, q.user_id, q.qna_title, q.reg_date, q.comment_state, q.prod_no, p.prod_name as prod_name 
               from QnA q join product p 
                          on p.prod_no = q.prod_no 
               where comment_state = "답변 대기"`,

    inquiryList : `select inquiry_no, inquiry_title, reg_date, comment_state, user_id 
               from inquiry 
               where comment_state = "답변 대기"`,

    qnaAllList : `select q.qna_no, q.user_id, q.qna_title, q.reg_date, q.comment_state, q.prod_no, p.prod_name as prod_name 
              from QnA q left join product p 
                         on p.prod_no = q.prod_no`,

    inquiryAllList : `select inquiry_no, inquiry_title, reg_date, comment_state, user_id 
                  from inquiry`,

    adminQnaInfo : `SELECT q.qna_no, q.user_id, q.qna_title, q.reg_date, q.qna_content, q.prod_no, q.qna_img, qr.reply_content, qr.reply_reg_date
                  FROM QnA q LEFT JOIN QnA_reply qr
                                  ON q.qna_no = qr.qna_no
                  WHERE q.qna_no = ?`,

    qnaReplyInsert : `INSERT INTO QnA_reply(reply_content, qna_no)
                      values(?, ?)`,

    qnaStateUpdate : `UPDATE QnA 
                      SET comment_state = "답변 완료"
                      WHERE qna_no = ? `,
    
    qnaReplyUpdate : `UPDATE QnAupdate QnA q LEFT JOIN QnA_reply qr
			                                 ON q.qna_no = qr.qna_no
                      SET q.comment_state = "답변 완료(수정)", qr.reply_content = ?, qr.reply_reg_date = CURRENT_TIMESTAMP
                      WHERE q.qna_no = ? `,

                      
}