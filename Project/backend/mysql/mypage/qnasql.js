module.exports = {
    qnaList: `SELECT qna_no, user_id, qna_title, reg_date, qna_content, comment_state, prod_no, user_id
              FROM QnA
              WHERE user_id = ?`,
    qnaInfo: `SELECT qna_no, user_id, qna_title, reg_date, qna_content, comment_state, prod_no, qna_img 
              FROM QnA
              WHERE qna_no = ? `,
    qnaInsert: `INSERT INTO QnA
                SET ?`,
    qnaUpdate: `UPDATE QnA
                SET qna_title = ?, qna_content = ?, reg_date = CURRENT_TIMESTAMP
                WHERE qna_no = ?`,
    qnaDelete: `DELETE
                FROM QnA
                WHERE qna_no = ?`,
    
    qnaReply: `SELECT qr.reply_content, q.qna_no 
               FROM QnA_reply qr join QnA q
               on qr.qna_no = q.qna_no
               where q.qna_no = ?
               group by qr.reply_content, q.qna_no`
}