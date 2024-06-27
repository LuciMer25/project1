const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');

  router.get("/memberList", async (req, res) => {
    let list = await query("memberList");
    res.send({ list });
  });

  router.get("/memberCount", async (req, res) => {
    let count = await query("memberCount");
    count = count[0].cnt;
    res.send({ count });
  });

 

module.exports = router;