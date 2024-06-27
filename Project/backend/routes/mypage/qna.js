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
    let result = await query("qnaList").then(res=>res);
    res.send(result);
});
//단건조회
router.get("/:qna_no",	async (req ,res )	=> {
    let result = await query("qnaInfo", req.params.qna_no );
    res.send(result);
});
//등록
router.post("/", upload.single("avatar"), async (req, res) => {
    let data = { ...req.body };
    if (req.file != null) {
      console.log('업로드된 파일이름:', req.file.filename);
      data.qna_img = req.file.filename;
    }
    let result = await query("qnaInsert", data);
    res.send(result);
  });
//수정
router.put('/:qna_no',  (req, res) => {
  const no = req.params.qna_no;
  const { qna_title, qna_content } = req.body;
  let result =  query("qnaUpdate", [qna_title, qna_content, no]);
  res.send(result);
});
// router.put("/:inquiry_no", async (req, res) => {
//     let result = await mysql.query("inquiryUpdate", [req.body, req.params.inquiry_no]);
//     res.send(result);
//   });
//삭제
router.delete('/:qna_no',  (req, res) => {
    let result =  query("qnaDelete", req.params.qna_no);
    res.send(result);
});
module.exports = router;