const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');

//목록
router.get("/",	async(req ,	res )	=> {
    let result = await query("orderList").then(res=>res);
    res.send(result);
});

router.put('/:order_no', async(req, res) => {
    const no = req.params.order_no;
    let result = await query("cancelOrder", [no]);
    res.send(result);
  });

  router.put('/CancelConfirm/:order_no', async(req, res) => {
    const no = req.params.order_no;
    let result = await query("CancelConfirm", [no]);
    res.send(result);
  })

  router.put('/ReturnState/:order_no' , async(req, res) => {
    const no = req.params.order_no;
    let result = await query("ReturnState", [no]);
    res.send(result);

  })

module.exports = router;