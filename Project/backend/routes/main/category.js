const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');

// 상위카테고리 
router.get("/", async (req, res) => {
  // let result = await query("TopCategoryName");
  // let result2 = await query("BotCategoryName");
  // let result3 = await query("TopCategoryName1");
  // let result1 = await query("FirstCategory");
  // let result2 = await query("SecondCategory");

  // ------------------------------------------------
  let UpResult1 = await query("UpCategory1");
  let DownResult1 = await query("DownCategory1")
  let UpResult2 = await query("UpCategory2");
  let DownResult2 = await query("DownCategory2")
  let UpResult3 = await query("UpCategory3");
  let DownResult3 = await query("DownCategory3")
  let UpResult4 = await query("UpCategory4");
  let DownResult4 = await query("DownCategory4")
  let UpResult5 = await query("UpCategory5");
  let DownResult5 = await query("DownCategory5")
  

  res.send({
    UpResult1,
    DownResult1,
    UpResult2,
    DownResult2,
    UpResult3,
    DownResult3,
    UpResult4,
    DownResult4,
    UpResult5,
    DownResult5
  });
});

// 하위카테고리
// router.get("", async (req, res) => {
 
  // res.send(result);
// })  

module.exports = router;