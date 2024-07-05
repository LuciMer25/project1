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
    cb(null, 'D:/project1/Project/backend/upload/review'); 
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
    let result = await query("reviewList", user_id).then(res=>res);
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
  const score = req.body.score;
  const user_id = req.body.user_id;
  const review_title = req.body.review_title;
  const review_content = req.body.review_content;
  const prod_no = req.body.prod_no;
  const order_no = req.body.order_no;
  console.log('평점' + score)
  console.log('유저:' + user_id);
  console.log('리뷰제목:' + review_title);
  console.log('리뷰내용:' + review_content);
  console.log('제품번호' + prod_no)
  console.log('주문번호:' + order_no);
  console.log(req.body);
  console.log(req.file);
    if (req.file != null) {
      console.log('업로드된 파일이름:', req.file.filename);
      data.review_img = req.file.filename;
    }
    let result = await query("reviewInsert", [score, review_title, review_content, user_id, data.review_img, order_no, prod_no]);
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