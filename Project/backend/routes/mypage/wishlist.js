const express = require("express");
const router = express.Router();
const query = require("../../mysql");

router.get("/wish/:id", async(req, res) => {
  const userId = req.params.id;
  console.log('id : '+ userId)
  let list = await query("wishList", [userId])
  res.send({list})
  console.log(list)
})

// 단건삭제
router.delete("/:wish_no", async (req, res) => {
  const wishNo = req.params.wish_no;
  let result = await query("delWish", wishNo);
  res.send(result);
});
module.exports = router;
