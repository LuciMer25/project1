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

    schedule.scheduleJob(new Date(Date.now() + 10000), async () => {
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

  router.put('/adminUpdateCancelState/:no', async(req, res) => {
    const no = req.params.no;
    let result = await query("adminUpdateCancelState", [no]);
    res.send(result);
  });

  router.put('/adminUpdateCancelComplete/:no', async(req, res) => {
    const no = req.params.no;
    let result = await query("adminUpdateCancelComplete", [no]);
    res.send(result);
  })

  router.put('/adminUpdateReturnState/:no' , async(req, res) => {
    const no = req.params.no;
    let result = await query("adminUpdateReturnState", [no]);
    await query("amdinUpdateReturnComplete", [no])
    res.send(result);

  })

  router.get('/orderProdDetail/:no' , async(req, res) => {
    const no = req.params.no;
    let list = await query("orderProdDetail", [no]);
    res.send({ list });
  })

  router.get('/orderUserDetail/:no' , async(req, res) => {
    const no = req.params.no;
    let list = await query("orderUserDetail", [no]);
    res.send(list[0]);
  })

  router.get('/cancelUserDetail/:no' , async(req, res) => {
    const no = req.params.no;
    let list = await query("cancelUserDetail", [no]);
    res.send(list[0]);
  })

  router.get('/returnUserDetail/:no' , async(req, res) => {
    const no = req.params.no;
    let list = await query("returnUserDetail", [no]);
    res.send(list[0]);
  })

  router.get('/todayTotalAmount', async(req, res) => {
    let list = await query("todayTotalAmount")
    res.send({ list })
  })

  router.get('/weekTotalAmount', async(req, res) => {
    let list = await query("weekTotalAmount")
    res.send({ list })
  })

  router.get('/categoryBest', async(req, res) => {
    let list = await query("categoryBest")
    res.send({ list })
  })
  
module.exports = router;