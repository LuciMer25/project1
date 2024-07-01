const memberSql = require("./memberSql.js");
const orderSql = require('./main/order/orderSql.js')
const productDetailSql = require('./main/order/productDetailSql.js');
const adminOrder = require('./admin/adminOrder');
const categorySql = require('./main/categorySql.js');
const searchSql = require('./main/searchSql.js')
const adminBoard = require('./admin/adminBoard')
const adminMember = require('./admin/adminMember')
const adminProduct = require('./admin/adminProduct')
const inquirysql = require('./mypage/inquirysql')
const qnasql = require('./mypage/qnasql');
const mypagemain = require('./mypage/mypagemain.js')
const mypageorder = require('./mypage/mypageorder');
const reviewsql = require('./mypage/reviewsql');
const ordersql = require('./mypage/ordersql');
const productsql = require('./product/productSql.js')
const signUp =require('./main/signUp.js')
const memcheck =require('./mypage/memcheck.js')

module.exports = {
  ...adminOrder,
  ...adminBoard,
  ...adminOrder,
  ...adminMember,
  ...adminProduct,
  ...memberSql,
  ...inquirysql,
  ...mypagemain,
  ...qnasql,
  ...mypageorder,
  ...ordersql,
  ...productsql,
  ...categorySql,
   ...searchSql,
   ...orderSql,
   ...productDetailSql,
   ...reviewsql,
   ...signUp,
   ...memcheck,
};
