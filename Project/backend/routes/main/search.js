const express = require('express');
const router = express.Router();
const query = require('../../mysql');

router.get("/:product",  async (req, res) => {
    let result = await query("SearchResult")
    .then(res=>res);
    console.log(req.query);
    console.log(res);
    res.send(result);
});

module.exports = router;
