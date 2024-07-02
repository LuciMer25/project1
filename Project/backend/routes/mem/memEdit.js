// routes/user.js 예시
const express = require('express');
const router = express.Router();
const query = require('../../mysql');

router.get("/", async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "User ID parameter is required" });
  }

  try {
    const result = await query("userEdit", user_id);
    res.json(result);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//수정
router.put("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  
  try {
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const result = await query("userUpdate", [req.body, user_id]);
    res.json({ success: true, message: "User information updated successfully" });
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
