const memberSql = require('./memberSql.js');const adminOrder = require('./admin/adminOrder')
module.exports = {
    ...adminOrder,
   ...memberSql,
}