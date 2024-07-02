module.exports = {
    usercheck: `
        SELECT * 
        from user
        where user_id = ? 
        or pw = ?
    `,
    userEdit: `
    SELECT
    name, user_id, pw, phone, birth,
    post_no, post_addr, post_detail_list
    FROM user
    WHERE user_id = ?
    `,
    userUpdate: `
   UPDATE user SET ? WHERE user_id = ?
    `,
    userDelete: `
    DELETE FROM user WHERE user_id = ? `,

};
