const express =	require("express");
const router =	express.Router();
const query =	require("../../mysql");

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
router.post("/", async (req, res) => {
    let result = await query("qnaInsert", req.body);
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