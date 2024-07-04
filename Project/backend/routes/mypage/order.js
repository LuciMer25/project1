const express = require("express");
const router = express.Router();
const query = require("../../mysql/index.js");
const multer = require('multer');
router.use(express.json());

// 로그 미들웨어 추가
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  next();
});

// Multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) { //파일이 저장 될 위치 지정
    cb(null, 'D:/project1/Project/backend/upload/mypageorder'); 
  },
  filename: function (req, file, cb) {
    const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 파일 utf-8로 변환
    cb(null, Date.now() + '-' + originalname);
  }
});
const upload = multer({ storage: storage });

//목록
router.get("/", async (req, res) => {
  const user_id = req.query.user_id;
  console.log(user_id);
  let result = await query("orderList", user_id).then((res) => res);
  res.send(result);
});
// 취소요청
router.put("/cancelOrder/:order_no", async (req, res) => {
  const no = req.params.order_no;
  let result = await query("cancelOrder", [no]);
  let result1 = await query("updateCancelState", [no]);
  res.send({ result, result1 });
});
// 취소요청 취소
router.put("/cancelRevoke/:order_no", async (req, res) => {
  const no = req.params.order_no;
  let result = await query("cancelRevoke", [no]);
  res.send(result);
});
// 반품요청 취소
router.put("/returnCancel/:order_no", async (req, res) => {
  const no = req.params.order_no;
  let result = await query("returnCancel", [no]);
  res.send(result);
});
// 구매확정
router.put("/orderConfirm/:order_no", async (req, res) => {
  const no = req.params.order_no;
  let result = await query("orderConfirm", [no]);
  let result1 = await query("updateConfirmState", [no]);
  res.send({ result, result1 });
});
// 반품요청
router.put("/returnOrder/:order_no", async (req, res) => {
  const no = req.params.order_no;
  let result = await query("returnOrder", [no]);
  let result1 = await query("updateReturnState", [no]);
  res.send({ result, result1 });
});

module.exports = router;
