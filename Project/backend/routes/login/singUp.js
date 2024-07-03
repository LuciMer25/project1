const express = require("express");
const router = express.Router();
const query = require("../../mysql");

// 목록
router.post("/", async (req, res) => {
  let result = await query("userInsert", req.body);
  res.send(result);
});

// 아이디 중복체크
router.post('/checkUserId', async (req, res) => {
  try {
    const { user_id } = req.body;  // req.body에서 user_id를 추출
    let result = await query('kakao', [user_id]);

    // 데이터베이스 쿼리 결과가 있을 경우
    if (result.length > 0) {
      res.send({ exists: true });
    } else {
      res.send({ exists: false });
    }
  } catch (error) {
    console.error("Error checking user ID:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// 전화번호 중복체크
router.post('/checkUserphone', async (req, res) => {
  try {
    const { phone } = req.body;  // req.body에서 user_id를 추출
    let result = await query('phone', [phone]);

    // 데이터베이스 쿼리 결과가 있을 경우
    if (result.length > 0) {
      res.send({ exists: true });
    } else {
      res.send({ exists: false });
    }
  } catch (error) {
    console.error("Error checking phone:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
