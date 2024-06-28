module.exports = {
    maininquiryList: `SELECT inquiry_no, inquiry_title, inquiry_content, reg_date, comment_state, user_id 
                       FROM inquiry LIMIT 5`,
}