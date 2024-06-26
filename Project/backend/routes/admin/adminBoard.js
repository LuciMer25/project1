const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');

  router.get("/qnaList", async (req, res) => {
    let list = await query("qnaList");
    res.send({ list });
  });
  
  router.get("/inquiryList", async (req, res) => {
    let list = await query("inquiryList");
    res.send({ list });
  });

  router.get("/qnaAllList", async (req, res) => {
    let list = await query("qnaAllList");
    res.send({ list });
  });
  
  router.get("/inquiryAllList", async (req, res) => {
    let list = await query("inquiryAllList");
    res.send({ list });
  });



module.exports = router;