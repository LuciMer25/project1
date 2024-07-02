const express =	require("express");
const router =	express.Router();
const query =	require("../../mysql");
const multer = require('multer');

// Multer 설정
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

//목록
router.get("/",	async(req ,	res )	=> {
    let result = await query("reviewList").then(res=>res);
    res.send(result);
});
//단건조회
router.get("/:review_no",	async (req ,res )	=> {
    let result = await query("reviewInfo", req.params.review_no );
    res.send(result);
});
//등록
router.post("/", upload.single("avatar"), async (req, res) => {
  let data = { ...req.body };
    if (req.file != null) {
      console.log('업로드된 파일이름:', req.file.filename);
      data.review_img = req.file.filename;
    }
    let result = await query("reviewInsert", data);
    res.send(result);
  });
//수정
router.put('/:review_no',  (req, res) => {
  const no = req.params.review_no;
  const { review_title, review_content, score } = req.body;
  let result =  query("reviewUpdate", [review_title, review_content, score, no]);
  res.send(result);
});
//삭제
router.delete('/:review_no',  (req, res) => {
    let result =  query("reviewDelete", req.params.review_no);
    res.send(result);
});

module.exports = router;