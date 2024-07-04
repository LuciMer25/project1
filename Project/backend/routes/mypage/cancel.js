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
      cb(null, 'D:/project1/Project/backend/upload/inquiry'); 
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
    let result = await query("cancelList", user_id).then((res) => res);
    res.send(result);
  });

module.exports = router;
