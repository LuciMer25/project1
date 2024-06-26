const memberSql = require('./memberSql.js');
const adminOrder = require('./admin/adminOrder');
const categorySql = require('./main/categorySql.js');
module.exports = {
   ...adminOrder,
   ...memberSql,
   ...categorySql
}