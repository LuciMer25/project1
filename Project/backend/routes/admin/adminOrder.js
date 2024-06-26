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

  router.get("/orderAllList", async (req, res) => {
    let list = await query("orderAllList");
    res.send({ list });
  });

  router.put('/updateWayBill/:no', async(req, res) => {
    const no = req.params.no;
    const waybill = req.body.wayBill;
    let result = await query("updateWayBill",[waybill, no]);
    res.send(result);
  });


  module.exports = router;