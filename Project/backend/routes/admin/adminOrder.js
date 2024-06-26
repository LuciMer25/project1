const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
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

    schedule.scheduleJob(new Date(Date.now() + 5000), async () => {
      console.log(`주문번호 : ${no}`);
      try {
        await query("updateStateSchedule", [no]);
        console.log("배송완료로 변경");
      } catch (err) {
        console.log(`스케쥴링 안됨`, err);
      }
    })

  });

  router.put('/updateOrderState/:no', async(req, res) => {
    const no = req.params.no;
    let result = await query("updateOrderState", [no]);
    res.send(result);
  });

  router.get("/cancelALLList", async (req, res) => {
    let list = await query("cancelALLList");
    res.send({ list });
  });

  router.put('/updateCancelState/:no', async(req, res) => {
    const no = req.params.no;
    let result = await query("updateCancelState", [no]);
    res.send(result);
  });

  router.put('/updateCancelComplete/:no', async(req, res) => {
    const no = req.params.no;
    let result = await query("updateCancelComplete", [no]);
    res.send(result);
  })




module.exports = router;