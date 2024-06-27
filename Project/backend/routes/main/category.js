const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');

// 상위카테고리 
router.get("/", async (req, res) => {
  let result = await query("TopCategoryName");
  let result2 = await query("BotCategoryName");
  res.send({result,result2});
  });

// 하위카테고리
// router.get("", async (req, res) => {
 
  // res.send(result);
// })  

module.exports = router;