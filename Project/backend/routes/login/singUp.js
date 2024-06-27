const express =	require("express");
const router =	express.Router();
const query =	require("../../mysql");

//목록
router.post("/", async (req, res) => {
    let result = await query("userInsert", req.body);
    res.send(result);
  });

module.exports = router;