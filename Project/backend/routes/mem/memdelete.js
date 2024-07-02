const express = require("express");
const router = express.Router();
const query = require("../../mysql");

router.delete("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const result = await query("userDelete", user_id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
