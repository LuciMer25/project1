module.exports = {
    inquiryList: `SELECT inquiry_no, inquiry_title, inquiry_content, reg_date, comment_state, user_id 
                  FROM inquiry`,
    inquiryInfo: `SELECT inquiry_no, inquiry_title, inquiry_content, reg_date, comment_state, user_id
                  FROM inquiry
                  WHERE inquiry_no = ? `,
    inquiryInsert: `INSERT INTO inquiry 
                    SET ? `,
    inquiryUpdate: `UPDATE inquiry 
                    SET inquiry_title = ?, inquiry_content = ? 
                    WHERE inquiry_no = ?`,
    
    inquiryDelete: `DELETE 
                    FROM inquiry 
                    WHERE inquiry_no = ?`
}