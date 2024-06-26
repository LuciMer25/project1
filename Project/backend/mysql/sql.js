const memberSql = require('./memberSql.js');
const adminOrder = require('./admin/adminOrder')
const inquirysql = require('./mypage/inquirysql')
const qnasql = require('./mypage/qnasql')
module.exports = {
    ...adminOrder,
   ...memberSql,
   ...inquirysql,
   ...qnasql,
}