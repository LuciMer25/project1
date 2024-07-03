module.exports = {
    deleteWish: `DELETE FROM wishlist 
                 WHERE user_id = ? AND prod_no = ?
    `,
    insertWish: `INSERT INTO wishlist(user_id, prod_no) 
                 VALUES (?, ?)
    `,
    startTransaction: 'START TRANSACTION',
    commit: 'COMMIT',
    rollback: 'ROLLBACK',
    iswished: `SELECT wish_no, user_id, prod_no 
               FROM wishlist
               WHERE user_id = ?
               AND prod_no = ?`
}