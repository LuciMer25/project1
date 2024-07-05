const express = require('express');
const router = express.Router();
const query = require('../../mysql');

router.get("/product",  async (req, res) => {
    console.log('검색 요청 호출됨');
    console.log('query'+req.query.product);
    let value = `%${req.query.product}%`
    console.log('value'+ value);
    let result = await query("SearchResult",value).then(res=>res);
    // console.log(res);
     res.send(result);
});

module.exports = router;
         