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

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const AccountRouter = require('./routes/account.js');
// 마이페이지(맹선우)
var inquiryRouter = require('./routes/mypage/inquiry');
var qnaRouter = require('./routes/mypage/qna');
const mypageorderRouter = require('./routes/mypage/mypageorder');

const CategoryRouter = require('./routes/main/category.js');
var app = express();

// 메인, 상품(김성태)
var productRouter = require('./routes/product/product.js');

//로그인 
var signUpRouter = require('./routes/login/singUp.js');
var loginRouter = require('./routes/login/login.js');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/upload', express.static('D:/upload'));

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

app.use('/', indexRouter);
app.use('/users', usersRouter);
//관리자
app.use('/api/adminOrder', adminOrderRouter);
app.use('/api/adminMember', adminMemberRouter);
app.use('/api/adminProduct', adminProductRouter);
app.use('/api/adminBoard', adminBoardRouter);


app.use('/api/account',AccountRouter);
// 마이페이지(맹선우)
app.use('/api/inquiry', inquiryRouter)
app.use('/api/qna', qnaRouter)
app.use('/api/mypageorder', mypageorderRouter);

// 메인, 상품(김성태)
app.use('/api/product', productRouter);

//로그인 회원가입(송성혁)
app.use('/api/signUp', signUpRouter);
app.use('/api/login', loginRouter);


app.use('/api/category', CategoryRouter);

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
