const express =	require("express");
const router =	express.Router();
const query =	require("../../mysql");
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
router.get("/",	async(req ,	res )	=> {
  const user_id = req.query.user_id;
  console.log(user_id);
    let result = (await query("inquiryList", user_id))
    res.send(result);
});
//단건조회
router.get("/:inquiry_no",	async (req ,res )	=> {
    let result = await query("inquiryInfo", req.params.inquiry_no );
    res.send(result);
});


//등록
router.post("/", upload.single("avatar"), async (req, res) => {
  let data = { ...req.body };
  const user_id = req.body.user_id;
  const inquiry_title = req.body.inquiry_title;
  const inquiry_content = req.body.inquiry_content;
  console.log('유저:' + user_id);
  console.log('문의제목:' + inquiry_title);
  console.log('문의내용:' + inquiry_content);
  console.log(req.body);
  console.log(req.file)
  if (req.file != null) {
    console.log('업로드된 파일이름:', req.file.filename);
    data.inquiry_img = req.file.filename;
  }
  let result = await query("inquiryInsert", [inquiry_title, inquiry_content, user_id, data.inquiry_img]);
  res.send(result);
});
//수정
router.put('/:inquiry_no',  (req, res) => {
  const no = req.params.inquiry_no;
  const { inquiry_title, inquiry_content} = req.body;
  let result =  query("inquiryUpdate", [inquiry_title, inquiry_content, no]);
  res.send(result);
});

//삭제
router.delete('/:inquiry_no',  (req, res) => {
    let result =  query("inquiryDelete", req.params.inquiry_no);
    res.send(result);
});

//문의 답변 조회
router.get("/reply/:inquiry_no",	async (req ,res )	=> {
    let result = await query("inquiryReply", req.params.inquiry_no);
    res.send(result);
  });



module.exports = router;