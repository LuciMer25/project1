const memberSql = require("./memberSql.js");
const orderSql = require('./main/order/orderSql.js')
const productDetailSql = require('./main/order/productDetailSql.js');
const adminOrder = require('./admin/adminOrder');
const categorySql = require('./main/categorySql.js');
const searchSql = require('./main/searchSql.js')
const adminBoard = require('./admin/adminBoard')
const adminMember = require('./admin/adminMember')
const adminProduct = require('./admin/adminProduct')
const inquirysql = require('./mypage/inquirysql');
const qnasql = require('./mypage/qnasql');
const mypagemain = require('./mypage/mypagemain.js');
const mypageorder = require('./mypage/mypageorder');
const reviewsql = require('./mypage/reviewsql');
const ordersql = require('./mypage/ordersql');
const cancelsql = require('./mypage/cancelsql')
const wishlistsql = require('./mypage/wishlist')
const productsql = require('./product/productSql.js');
const signUp =require('./main/signUp.js');
const cart = require('./main/order/cartSql.js');
const wish = require('./main/order/wishSql.js');
const memcheck =require('./mypage/memcheck.js');
const adminChart = require('./admin/adminChart.js');

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
  ...cancelsql,
  ...productsql,
  ...categorySql,
   ...searchSql,
   ...orderSql,
   ...wishlistsql,
   ...productDetailSql,
   ...reviewsql,
   ...signUp,
   ...cart,
   ...wish,
   batchUpdate: cart.batchUpdate,
   ...memcheck,
   ...adminChart,
};
