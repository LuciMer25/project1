module.exports = {
    qnaList: `SELECT qna_no, user_id, qna_title, reg_date, qna_content, comment_state, prod_no, user_id
              FROM QnA
              WHERE user_id = ?`,
    // qnaInfo: `SELECT qna_no, user_id, qna_title, reg_date, qna_content, comment_state, prod_no, qna_img 
    //           FROM QnA
    //           WHERE qna_no = ? `,
    qnaInfo: `SELECT q.qna_no, q.user_id, q.qna_title, q.reg_date, q.qna_content, q.comment_state, q.qna_img, p.prod_no, p.prod_name, p.prod_img
            FROM QnA q join product p
            on q.prod_no = p.prod_no
              WHERE q.qna_no = ? `,
    qnaInsert: `INSERT INTO QnA(qna_title, qna_content, user_id, qna_img, prod_no)
                VALUES(?,?,?,?,?)`,
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
               group by qr.reply_content, q.qna_no`,

    getProductQna: `SELECT q.prod_no, 
                            q.qna_no, 
                            q.qna_title, 
                            q.qna_content, 
                            q.user_id, 
                            q.reg_date, 
                            qr.reply_content
                     FROM QnA_reply qr JOIN QnA q
                                       ON qr.qna_no = q.qna_no
                     WHERE q.prod_no = ?
                     GROUP BY qr.reply_content, 
                              q.qna_no, 
                              q.qna_title,
                              q.qna_content,
                              q.user_id,
                              q.reg_date,
                              q.prod_no
                     ORDER BY q.reg_date DESC`,
    
    selectProdQnA: `SELECT prod_name, prod_no
                    FROM product`
    
    
    // 07/06 추가
    // QnAFirstCtgr: `SELECT ctgr_name, 
    //                 ctgr_no, top_ctgr_no
    //                 FROM category 
    //                 WHERE top_ctgr_no IS NULL`,

    // QnASecondCtgr: `SELECT ctgr_no, ctgr_name 
    //                FROM category 
    //                WHERE top_ctgr_no = ?`,

    // QnAThirdCtgr: `select p.prod_no, p.prod_name, p.ctgr_no
    //                 from product p join category c
    //                 on p.ctgr_no = c.ctgr_no
    //                 where p.ctgr_no = ?`
}