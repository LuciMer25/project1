const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');

// 상위카테고리 
router.get("/", async (req, res) => {
  let result = await query("TopCategoryName");
  res.send(result);
  });

// 하위카테고리
router.get("/:no", async (req, res) => {
  let result = await query("botCategoryName");
  res.send(result);
})  

module.exports = router;