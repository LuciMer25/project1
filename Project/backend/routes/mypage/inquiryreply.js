const express =	require("express");
const router =	express.Router();
const query =	require("../../mysql");

// //문의 답변 조회
// // router.get("/:inquiry_no",	async (req ,res )	=> {
// //     let result = await query("inquiryReply", req.params.inquiry_no);
// //     res.send(result);
// //   });
//   router.get("/:no" , async (req, res) => {
//     const no = req.params.searchNo
//     console.log(no)
//     let result = await query('inquiryReply', [no]);
//     res.send(result)

//   })


  module.exports = router;