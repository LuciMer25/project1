const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');

router.get("/",  async (req, res) => {
    var query = sanitize(url.parse(request.url, true).query.query);
    // let result = await query("SearchResult");
    console.log(req.query);
    console.log(res);
});


module.exports = router;
