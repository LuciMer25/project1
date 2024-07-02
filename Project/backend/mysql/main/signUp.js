module.exports = {

    userInsert: `
    INSERT INTO user SET ?
`,
    userLogin: `
        SELECT * 
        from user
        where user_id = ? 
        and pw = ?
    `,
    userFind: `
    select user_id,name ,phone
     from user
     where phone = ?
     and name = ?
    `,
    userpwFind: `
     select *
     from user
     where user_id = ?
     and name = ?
     and phone =?
       `,

    userpw:`
   UPDATE user
    SET pw = ?
    WHERE user_id = ? AND name = ? AND phone = ?`
};
