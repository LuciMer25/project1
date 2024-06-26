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

    adminQnaInfo : `SELECT q.qna_no, q.user_id, q.qna_title, q.reg_date, q.qna_content, q.prod_no, q.qna_img, qr.reply_content, qr.reply_reg_date, p.prod_name
                    FROM QnA q LEFT JOIN QnA_reply qr
                                    ON q.qna_no = qr.qna_no
                                    JOIN product p
                                    ON q.qna_no = p.prod_no
                    WHERE q.qna_no = ?`,

    qnaReplyInsert : `INSERT INTO QnA_reply(reply_content, qna_no)
                      values(?, ?)`,

    qnaStateUpdate : `UPDATE QnA 
                      SET comment_state = "답변 완료"
                      WHERE qna_no = ? `,
    
    qnaReplyUpdate : `UPDATE QnA q LEFT JOIN QnA_reply qr
			                                 ON q.qna_no = qr.qna_no
                      SET q.comment_state = "답변 완료(수정)", qr.reply_content = ?, qr.reply_reg_date = CURRENT_TIMESTAMP
                      WHERE q.qna_no = ? `,

    adminInquiryInfo : `SELECT i.inquiry_no, i.inquiry_title, i.inquiry_content, i.reg_date, i.user_id, i.inquiry_img, ir.reply_content, ir.reply_reg_date
                        FROM inquiry i LEFT JOIN inquiry_reply ir
					                        ON i.inquiry_no = ir.inquiry_no
                        WHERE i.inquiry_no = ?`,
    
    inquiryReplyInsert : `INSERT INTO inquiry_reply(reply_content, inquiry_no)
                          VALUES(?, ?)`,
    
    inquiryStateUpdate : `UPDATE inquiry
                          SET comment_state = "답변 완료"
                          WHERE inquiry_no = ?`,

    inquiryReplyUpdate : `UPDATE inquiry i LEFT JOIN inquiry_reply ir
                                                ON i.inquiry_no = ir.inquiry_no
                          SET i.comment_state = "답변 완료(수정)", ir.reply_content = ? , ir.reply_reg_date = CURRENT_TIMESTAMP
                          WHERE i.inquiry_no = ?`,

    notifyList : `SELECT notice_no, title, reg_date, category
                  FROM notice
                  ORDER BY category = '공지' DESC, notice_no
                  LIMIT ? , ?`,

    notifyCount : `SELECT count(*) AS cnt FROM notice`,

    notifyFile : `SELECT table_class, path, file_name, sort, file_type
                 FROM file
                 WHERE board_no = ?
                 ORDER BY sort`,

    notifyInfo : `SELECT title, reg_date, content, category
                  FROM notice
                  WHERE notice_no = ?`


    
                      
}