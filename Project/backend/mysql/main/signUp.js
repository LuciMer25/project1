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
    userFind: `
    select user_id,name ,phone
     from user
     where phone = ?
     or name = ?
    `,
    userpwFind: `
    UPDATE user
    SET pw = ?
    WHERE user_id = ?
    And phone = ?
     And name = ?
    `
    
    
};
