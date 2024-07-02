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
    kakao:`
    SELECT * 
        from user
        where user_id = ?
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

    userupdatepw:`
   UPDATE user
    SET pw = ?
    WHERE user_id = ? AND name = ? AND phone = ?`
};
