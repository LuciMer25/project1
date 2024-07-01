// routes/login/useFind.js

const express = require('express');
const router = express.Router();
const query = require('../../mysql'); // MySQL 쿼리 실행 모듈 import

// 사용자 조회 쿼리


// POST /find 엔드포인트
router.post('/idFind', async (req, res) => {
  try {
    const { name, phone } = req.body;
 
    // 사용자 조회 쿼리 실행
    let result = await query('userFind', [phone, name]);
    if (result.length > 0) {
      res.status(200).send(result[0]); // 첫 번째 사용자 정보만 전송 (여러 개의 결과 중에서 하나를 선택)
    } else {
      res.status(404).send('사용자를 찾을 수 없습니다.'); // 사용자가 없는 경우 에러 응답
    }
  }
  catch (error) {
    console.error('서버오류:', error);
    res.status(500).send(error); // 서버 오류 응답
  }
});

router.post('/pwFInd', async (req, res) => {
  try {
    const { user_id, name, phone } = req.body;
 
    // 사용자 조회 쿼리 실행
    let result = await query('userpwFind', [user_id, name, phone]);
    if (result.length > 0) {
      res.status(200).send(result[0]); // 첫 번째 사용자 정보만 전송 (여러 개의 결과 중에서 하나를 선택)
    } else {
      res.status(404).send('사용자를 찾을 수 없습니다.'); // 사용자가 없는 경우 에러 응답
    }
  } catch (error) {
    console.error('서버오류:', error);
    res.status(500).send(error); // 서버 오류 응답
  }
});



module.exports = router;
