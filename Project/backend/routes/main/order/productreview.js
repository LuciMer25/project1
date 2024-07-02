const express = require('express');
const router = express.Router();
const query = require('../../../mysql/index.js');
const sql = require('../../../mysql/sql.js');

router.use(express.json());

  router.get("/", async (req, res) => {
    //const orders = req.body.orders; // 요청 바디에서 데이터 배열 가져오기
    //const detailList = req.body.detailList;
    const prod_no = req.query.prod_no;
    //console.log('상품번호: '+req.query.prod_no);
    const reviewList = (await query('productReviews',prod_no))
    res.send(reviewList);
  });

module.exports = router;