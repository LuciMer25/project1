const express = require('express');
const router = express.Router();
const query = require('../../../mysql/index.js');
const sql = require('../../../mysql/sql.js');

router.use(express.json());

  router.post("/", async (req, res) => {

    const order_no = req.body.order_no;
    const result = (await query('insertOrderState',order_no))
    res.send(result);
  });

module.exports = router;