const express =	require("express");
const router =	express.Router();
const query =	require("../../mysql");
const multer = require('multer');

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
// 위시리스트 목록
router.get("/",	async(req ,	res )	=> {
    let list = await query("wishList");
    res.send({list});
});

module.exports = router;