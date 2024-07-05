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

router.post("/", async (req, res) => {
  const user_id = req.body.user_id;
  console.log(user_id);
  let wishList = await query("addWish", user_id);
  res.send(wishList);
});

// 단건삭제
router.delete("/:wishNo", async (req, res) => {
  const wishNo = req.params.wishNo;
  let result = await query("delwish", wishNo);
  res.send(result);
});
module.exports = router;
