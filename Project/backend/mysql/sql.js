const memberSql = require('./memberSql.js');
const orderSql = require('./main/order/orderSql.js')

const adminOrder = require('./admin/adminOrder');
const categorySql = require('./main/categorySql.js');
const adminBoard = require('./admin/adminBoard')
const adminMember = require('./admin/adminMember')
const adminProduct = require('./admin/adminProduct')
const inquirysql = require('./mypage/inquirysql')
const qnasql = require('./mypage/qnasql');
const mypageorder = require('./mypage/mypageorder');
const productsql = require('./product/productSql.js')

module.exports = {
   ...adminOrder,
    ...adminBoard,
    ...adminOrder,
    ...adminMember,
    ...adminProduct,


   ...memberSql,
   ...inquirysql,
   ...qnasql,
   ...mypageorder,
   ...productsql,
   ...categorySql,
   ...orderSql
}