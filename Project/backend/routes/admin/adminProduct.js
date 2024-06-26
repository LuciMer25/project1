const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) { //파일이 저장 될 위치 지정
    cb(null, 'D:/upload'); 
  },
  filename: function (req, file, cb) {
    const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 파일 utf-8로 변환
    cb(null, Date.now() + '-' + originalname);
  }
});
const upload = multer({ storage: storage });

router.get("/prodList", async (req, res) => {
  let list = await query("prodList");
  res.send({ list });
});

router.post("/", upload.fields([
  { name: 'prodImg' }, 
  { name: 'contentImg' } 
]), async (req, res) => {
  let data = { ...req.body };
  if (req.files) {
    if (req.files.prodImg) {
      data.prodImg = req.files.prodImg[0].filename;
    }
    if (req.files.contentImg) {
      data.contentImg = req.files.contentImg[0].filename;
    }
  }
  let result = await query("productInsert", data);
  res.send(result);
});


module.exports = router;