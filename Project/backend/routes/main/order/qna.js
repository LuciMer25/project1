const express = require('express');
const router = express.Router();
const mysql = require('../../../mysql/main/order/myindex.js');
router.get("/:no", async (req,res)=>{
    const no = req.params.no;
    console.log('상품번호 : '+no);
    let qnaList = (await mysql.query('getProductQna',no));
    res.send(qnaList);
  });
  
  module.exports = router;