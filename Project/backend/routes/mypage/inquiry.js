const express =	require("express");
const router =	express.Router();
const query =	require("../../mysql");

//목록
router.get("/",	async(req ,	res )	=> {
    let result = await query("inquiryList").then(res=>res);
    res.send(result);
});
//단건조회
router.get("/:inquiry_no",	async (req ,res )	=> {
    let result = await query("inquiryInfo", req.params.inquiry_no );
    res.send(result);
});
//등록
router.post("/", async (req, res) => {
    let result = await query("inquiryInsert", req.body);
    res.send(result);
  });
//수정
router.put('/:inquiry_no',  (req, res) => {
  const no = req.params.inquiry_no;
  const { inquiry_title, inquiry_content } = req.body;
  let result =  query("inquiryUpdate", [inquiry_title, inquiry_content, no]);
  res.send(result);
});
// router.put("/:inquiry_no", async (req, res) => {
//     let result = await mysql.query("inquiryUpdate", [req.body, req.params.inquiry_no]);
//     res.send(result);
//   });
//삭제
router.delete('/:inquiry_no',  (req, res) => {
    let result =  query("inquiryDelete", req.params.inquiry_no);
    res.send(result);
});
module.exports = router;