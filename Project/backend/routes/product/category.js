const express = require("express");
const router = express.Router();
const query = require("../../mysql");

//목록
router.get("/:top_ctgr_no", async (req, res) => {
  let result = await query("categoryTopList",req.params.top_ctgr_no);
  res.send(result);
});
router.get("/:top_ctgr_no/:ctgr_no", async (req, res) => {
    try {
      const { top_ctgr_no, ctgr_no } = req.params;
      let result = await query("categoryBotList", [top_ctgr_no, ctgr_no]);
      res.send(result);
    } catch (error) {
      console.error("Error fetching category list:", error);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
