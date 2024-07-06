var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session'); 
const fileStore = require('session-file-store')(session);

//관리자
const adminOrderRouter = require('./routes/admin/adminOrder.js')
const adminMemberRouter = require('./routes/admin/adminMember.js')
const adminBoardRouter = require('./routes/admin/adminBoard.js')
const adminProductRouter = require('./routes/admin/adminProduct.js')
const adminChartRouter = require('./routes/admin/adminChart.js')

// 주문관련(정수범)
const AccountRouter = require('./routes/main/order/account.js');
const CheckoutRouter = require('./routes/main/order/checkout.js');
const ProductInfoRouter = require('./routes/main/order/productDetail.js');
const CartRouter = require('./routes/main/order/cart.js');
const ProductReviewRouter = require('./routes/main/order/productreview.js');
const OrderStateRouter = require('./routes/main/order/orderstate.js');
const ProductQnaRouter = require('./routes/main/order/qna.js');

// 마이페이지(맹선우)
var inquiryRouter = require('./routes/mypage/inquiry');
var qnaRouter = require('./routes/mypage/qna');
const mypageorderRouter = require('./routes/mypage/mypageorder');
// const inquiryreplyRouter = require('./routes/mypage/inquiryreply')
const reviewRouter = require('./routes/mypage/review');
const wishRouter = require('./routes/mypage/wishlist');
const orderRouter = require('./routes/mypage/order');
const cancelRouter = require('./routes/mypage/cancel');

// 헤더, 검색(최석원)
const CategoryRouter = require('./routes/main/category.js');
const SearchRouter = require('./routes/main/search.js');
var app = express();

// 메인, 상품(김성태)
var productNewRouter = require('./routes/product/newproduct.js');
var productBestRouter = require('./routes/product/bestproduct.js');
var productThreeRouter = require('./routes/product/threeproduct.js');
var productCupbapRouter = require('./routes/product/cupbapproduct.js')
var bannerRouter = require('./routes/product/banner.js')
var CategoryListRouter = require('./routes/product/category.js')

//로그인 
var signUpRouter = require('./routes/login/singUp.js');
var loginRouter = require('./routes/login/login.js');
var kakaologinRouter = require('./routes/login/kakaologin.js');
const userFindRouter = require('./routes/login/useFind.js');

var memcheckRoter = require('./routes/mem/memcheck.js');
var memEditRouter = require('./routes/mem/memEdit.js');
var memdeleteRouter = require('./routes/mem/memdelete.js');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/upload', express.static('D:/git_home/project1/project/backend/upload'));
// app.use('/api/upload/products', express.static('D:/upload/products'));
app.use('/api/upload/products', (req, res, next) => {
  const filePath = path.join('D:project1/Project/backend/upload/products', req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      // 이미지 파일이 없을 경우 대체 이미지를 제공
      res.sendFile(path.join('D:project1/Project/frontend/', 'public/imgs/loadfail.jpg'));
    }
  });
});

app.use('/api/upload/review', (req, res, next) => {
  const filePath = path.join('D:project1/Project/backend/upload/review', req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      // 이미지 파일이 없을 경우 대체 이미지를 제공
      res.sendFile(path.join('D:project1/Project/frontend/', 'public/imgs/loadfail.jpg'));
    }
  });
});

// app.use('/api/upload/products', (req, res, next) => {
//   const filePath = path.join('D:project1/Project/backend/upload/products', decodeURIComponent(req.path));

//   // 파일이 존재하는지 확인
//   fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) {
//       // 파일이 없으면 404 에러를 반환하고 대체 이미지를 제공
//       res.status(404).sendFile('D:project1/Project/backend/upload/products/loadfail.jpg');
//     } else {
//       // 파일이 있으면 해당 파일을 반환
//       res.sendFile(filePath, (err) => {
//         if (err) {
//           // 파일 전송 중 에러가 발생하면 500 에러 반환
//           res.status(500).send('Internal Server Error');
//         }
//       });
//     }
//   });
// });

app.use(session({
  secret: 'secret key', //암호화하는 데 쓰일 키
  resave: false, // 세션에 변경사항이 없어도 항상 다시 저장할지 여부
  saveUninitialized: true, // 초기화되지 않은 세션을 스토어(저장소)에 강제로 저장할지 여부
  cookie: { // 세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
    httpOnly: true, // true 이면 클라이언트 자바스크립트에서 document.cookie로 쿠키 정보를 볼 수 없음
    secure: false, // true 이면 https 환경에서만 쿠키 정보를 주고 받도록 처리, 개발 환경에서는 false로 설정
    maxAge: 60000 // 쿠키가 유지되는 시간 (밀리세컨드 단위)
  },
  store: new fileStore() // 세션 저장소로 fileStore 사용
}));


//관리자
app.use('/api/adminOrder', adminOrderRouter);
app.use('/api/adminMember', adminMemberRouter);
app.use('/api/adminProduct', adminProductRouter);
app.use('/api/adminBoard', adminBoardRouter);
app.use('/api/adminChart', adminChartRouter);
// 주문관련(정수범)
app.use('/api/account',AccountRouter);
app.use('/api/checkout',CheckoutRouter);
app.use('/api/productInfo',ProductInfoRouter);
app.use('/api/cart',CartRouter);
app.use('/api/productreviews',ProductReviewRouter);
app.use('/api/insertorderstate',OrderStateRouter);
app.use('/api/productqna',ProductQnaRouter);


// 마이페이지(맹선우)
app.use('/api/inquiry', inquiryRouter);
// app.use('/api/inquiryreply', inquiryreplyRouter)
app.use('/api/qna', qnaRouter);
app.use('/api/mypageorder', mypageorderRouter);
app.use('/api/review', reviewRouter);
app.use('/api/wishlist', wishRouter);
app.use('/api/order', orderRouter);
app.use('/api/cancel', cancelRouter);


// 메인, 상품(김성태)
app.use('/api/newproduct', productNewRouter)
app.use('/api/bestproduct', productBestRouter)
app.use('/api/threeproduct', productThreeRouter)
app.use('/api/cupbapproduct', productCupbapRouter)
app.use('/api/banner',bannerRouter)
app.use('/api/categorylist', CategoryListRouter)

//로그인 회원가입(송성혁)
app.use('/api/signUp', signUpRouter);
app.use('/api/login', loginRouter);
app.use('/api/userFind', userFindRouter); 
app.use('/api/kakaologin', kakaologinRouter); 


// 메인, 카테고리(최석원)
app.use('/api/category', CategoryRouter);
app.use('/api/search', SearchRouter);

app.use('/api/memcheck', memcheckRoter);
app.use('/api/memEdit', memEditRouter);
app.use('/api/memdelete', memdeleteRouter);


//

// 요청 로그
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
