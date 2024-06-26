const memberSql = require('./memberSql.js');
module.exports = {
   testList: `select * from testTable`,
   ...memberSql,
}