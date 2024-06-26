module.exports = {
    qnaList: `SELECT qna_no, user_id, qna_title, reg_date, qna_content, comment_state, prod_no 
              FROM QnA`,
    qnaInfo: `SELECT qna_no, user_id, qna_title, reg_date, qna_content, comment_state, prod_no 
              FROM QnA
              WHERE qna_no = ? `,
    qnaInsert: `INSERT INTO QnA
                SET ?`,
    qnaUpdate: `UPDATE QnA
                SET qna_title = ?, qna_content = ?, reg_date = CURRENT_TIMESTAMP
                WHERE qna_no = ?`,
    qnaDelete: `DELETE
                FROM QnA
                WHERE qna_no = ?`
}