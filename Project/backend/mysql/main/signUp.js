module.exports = {

    userInsert: `
    INSERT INTO user SET ?
`,
    userLogin: `
        SELECT * 
        from user
        where user_id = ? 
        or pw = ?
    `,
};
