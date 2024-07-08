module.exports = {
    inquiryList: `SELECT inquiry_no, inquiry_title, inquiry_content, reg_date, comment_state, user_id 
                  FROM inquiry
                  WHERE user_id = ?
                  order by reg_date desc`,
    inquiryInfo: `SELECT inquiry_no, inquiry_title, inquiry_content, reg_date, comment_state, user_id, inquiry_img
                  FROM inquiry
                  WHERE inquiry_no = ? `,
    inquiryInsert: `INSERT INTO inquiry(inquiry_title, inquiry_content, user_id, inquiry_img)
                    VALUES(?,?,?,?)`,
    inquiryUpdate: `UPDATE inquiry 
                    SET inquiry_title = ?, inquiry_content = ?, reg_date = CURRENT_TIMESTAMP
                    WHERE inquiry_no = ?`,
    
    inquiryDelete: `DELETE 
                    FROM inquiry 
                    WHERE inquiry_no = ?`,
    
    inquiryReply: `SELECT ir.reply_content, i.inquiry_no 
                   FROM inquiry_reply ir join inquiry i
                   on ir.inquiry_no = i.inquiry_no
                   where i.inquiry_no = ?
                   group by ir.reply_content, i.inquiry_no`,
}