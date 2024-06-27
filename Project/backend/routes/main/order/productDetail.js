const express = require('express');
const router = express.Router();
const query = require('../../../mysql/index');
router.get("/:no", async (req,res)=>{
    const no = req.params.no;
    console.log('상품번호 : '+no);
    let product = (await query('getProductInfo',no));
    res.send(product);
  });



  module.exports = router;