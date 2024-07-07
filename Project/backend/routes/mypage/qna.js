const express = require("express");
const router = express.Router();
const query = require("../../mysql");
const multer = require("multer");
router.use(express.json());

// 로그 미들웨어 추가
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);
  next();
});

// Multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //파일이 저장 될 위치 지정
    cb(null, "D:/project1/Project/backend/upload/qna");
  },
  filename: function (req, file, cb) {
    const originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    ); // 파일 utf-8로 변환
    cb(null, Date.now() + "-" + originalname);
  },
});
const upload = multer({ storage: storage });

//목록
router.get("/", async (req, res) => {
  const user_id = req.query.user_id;
  console.log(user_id);
  let result = await query("qnaList", user_id).then((res) => res);
  res.send(result);
});
// 07/06 추가
// QnA상품목록
router.get("/selectProdQnA", async (req, res) => {
  try {
    let result = await query("selectProdQnA");
    res.send(result);
  } catch (error) {
    console.error("Error fetching product QnA:", error);
    res.status(500).send("Failed to fetch product QnA");
  }
});
//단건조회
router.get("/:qna_no", async (req, res) => {
  let result = await query("qnaInfo", req.params.qna_no);
  res.send(result);
});
//등록
router.post("/", upload.single("avatar"), async (req, res) => {
  let data = { ...req.body };
  const user_id = req.body.user_id;
  const qna_title = req.body.qna_title;
  const qna_content = req.body.qna_content;
  const prod_no = req.body.prod_no;
  console.log("유저:" + user_id);
  console.log("qna제목:" + qna_title);
  console.log("qna내용:" + qna_content);
  console.log("제품번호" + prod_no)
  console.log(req.body);
  console.log(req.file)
  if (req.file != null) {
    console.log("업로드된 파일이름:", req.file.filename);
    data.qna_img = req.file.filename;
  }
  let result = await query("qnaInsert", [qna_title, qna_content, user_id, data.qna_img, prod_no]);
  res.send(result);
});
//수정
router.put("/:qna_no", (req, res) => {
  const no = req.params.qna_no;
  const { qna_title, qna_content } = req.body;
  let result = query("qnaUpdate", [qna_title, qna_content, no]);
  res.send(result);
});

//삭제
router.delete("/:qna_no", (req, res) => {
  let result = query("qnaDelete", req.params.qna_no);
  res.send(result);
});
//QnA 답변 조회
router.get("/reply/:qna_no", async (req, res) => {
  let result = await query("qnaReply", req.params.qna_no);
  res.send(result);
});

// QnA 대분류
// router.get("/QnAFirstCtgr", async (req, res) => {
//   const user_id = req.query.user_id
//   let result = await query("QnAFirstCtgr", user_id);
//     console.log("QnA : "+ user_id)
//     console.log("대분류 리스트:" + result); // 콘솔에 결과를 로그로 출력해 확인
//     const topCategories = result.filter(category => !category.top_ctgr_no);
//     const categories = result.filter(category => category.top_ctgr_no);
//     res.send({ topCategories, categories });
// });
// QnA 소분류
// router.get("/QnASecondCtgr/:no", async (req, res) => {
//   const no = req.params.no;
//   let list = await query("QnASecondCtgr", [no]);
//   res.send({ list });
// });
// QnA 상품선택
// router.get("/QnAThirdCtgr/:no", async (req, res) => {
//   const no = req.params.no;
//   let list = await query("QnAThirdCtgr", [no]);
//   res.send({ list });
// });
module.exports = router;
