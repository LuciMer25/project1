module.exports = {

    memberList : `select * from user`,
    memberCount : `select count(*) cnt from user`,

    memberUpdateDate : `UPDATE user 
                        SET access_date = CURRENT_TIMESTAMP, user_resp = '일반회원'
                        WHERE user_id = ?`,

    adminUpdateDate : `UPDATE user
                       SET access_date = CURRENT_TIMESTAMP
                       WHERE user_id = ?`,

    memberUpdateResp : `UPDATE user
                        SET user_resp = '휴면계정'
                        WHERE user_id = ?`,

    getUserResp : `SELECT user_resp
                   FROM user
                   WHERE user_id = ?`
}