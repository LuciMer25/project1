// routes/login/useFind.js

const express = require('express');
const router = express.Router();
const query = require('../../mysql'); // MySQL 쿼리 실행 모듈 import

// POST /idFind 엔드포인트
router.post('/idFind', async (req, res) => {
  try {
    const { name, phone } = req.body;
 
    // 사용자 조회 쿼리 실행
    let result = await query('userFind', [phone, name]);
    if (result.length > 0) {
      res.status(200).send(result[0]); // 첫 번째 사용자 정보만 전송
    } else {
      res.status(404).send('사용자를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('서버오류:', error);
    res.status(500).send(error);
  }
});

// POST /pwFind 엔드포인트
router.post('/pwFind', async (req, res) => {
  try {
    const { user_id, name, phone } = req.body;
 
    // 사용자 조회 쿼리 실행
    let result = await query('userpwFind', [user_id, name, phone]);
    if (result.length > 0) {
      res.status(200).send(result[0]); // 첫 번째 사용자 정보만 전송
    } else {
      res.status(404).send('사용자를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('서버오류:', error);
    res.status(500).send(error);
  }
});

// PUT /updatepw 엔드포인트
router.put('/updatepw', async (req, res) => {
  try {
    const { user_id, name, phone, pw } = req.body;
 
    // 사용자 비밀번호 업데이트 쿼리 실행
    let result = await query('userupdatepw', [pw, user_id, name, phone]);
    if (result.affectedRows > 0) {
      res.status(200).send('비밀번호가 업데이트되었습니다.');
    } else {
      res.status(404).send('사용자를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('서버오류:', error);
    res.status(500).send(error);
  }
});

module.exports = router;
