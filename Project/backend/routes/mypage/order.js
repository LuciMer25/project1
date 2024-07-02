const express = require("express");
const router = express.Router();
const query = require("../../mysql/index.js");

//목록
router.get("/", async (req, res) => {
  let result = await query("orderList").then((res) => res);
  res.send(result);
});
// 취소요청
router.put("/cancelOrder/:order_no", async (req, res) => {
  const no = req.params.order_no;
  let result = await query("cancelOrder", [no]);
  res.send(result);
});
// 취소요청 취소
router.put("/cancelRevoke/:order_no", async (req, res) => {
  const no = req.params.order_no;
  let result = await query("cancelRevoke", [no]);
  res.send(result);
});
// 반품요청 취소
router.put("/returnCancel/:order_no", async (req, res) => {
  const no = req.params.order_no;
  let result = await query("returnCancel", [no]);
  res.send(result);
});
// 구매확정
router.put("/orderConfirm/:order_no", async (req, res) => {
  const no = req.params.order_no;
  let result = await query("orderConfirm", [no]);
  res.send(result);
});
// 반품요청
router.put("/returnOrder/:order_no", async (req, res) => {
  const no = req.params.order_no;
  let result = await query("returnOrder", [no]);
  res.send(result);
});

module.exports = router;
