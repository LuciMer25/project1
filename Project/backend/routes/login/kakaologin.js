const express = require("express");
const router = express.Router();
const query = require("../../mysql");

// 사용자 조회
router.get("/", async (req, res) => {
  const user_id = req.query.user_id; // 쿼리 문자열에서 user_id 파라미터를 가져옵니다.
  console.log(user_id); // user_id를 로깅하여 확인합니다.

  try {
    let result = await query("kakao", [user_id]); // user_id를 파라미터로 사용하여 쿼리를 실행합니다.
    if (result.length > 0) {
      // 해당 user_id를 가진 사용자가 존재하는 경우
      res.send({ exists: true });
    } else {
      // 해당 user_id를 가진 사용자가 존재하지 않는 경우
      res.send({ exists: false });
    }
  } catch (error) {
    console.error("사용자 조회 오류:", error);
    res.sendStatus(500); // 내부 서버 오류 응답
  }
});

module.exports = router;
