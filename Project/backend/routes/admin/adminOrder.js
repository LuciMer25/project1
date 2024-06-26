const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');

  router.get("/orderList", async (req, res) => {
    let list = await query("adminOrderList");
    res.send({ list });
  });

  router.get("/cancelList", async (req, res) => {
    let list = await query("cancelOrderList");
    res.send({ list });
  });

  router.get("/returnList", async (req, res) => {
    let list = await query("returnOrderList");
    res.send({ list });
  });

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

  router.get("/memberList", async (req, res) => {
    let list = await query("memberList");
    res.send({ list });
  });

  router.get("/memberCount", async (req, res) => {
    let count = await query("memberCount");
    count = count[0].cnt;
    res.send({ count });
  });

  router.get("/prodList", async (req, res) => {
    let list = await query("prodList");
    res.send({ list });
  });

  router.get("/orderAllList", async (req, res) => {
    let list = await query("orderAllList");
    res.send({ list });
  });
  module.exports = router;