const express = require('express');
const router = express.Router();
const query = require('../../../mysql/index.js');
const query2 = require('./test.js');
const sql = require('../../../mysql/sql.js');

router.use(express.json());

  router.post("/", async (req, res) => {
    const orders = req.body.orders; // 요청 바디에서 데이터 배열 가져오기
    const detailList = req.body.detailList;
    console.log(orders);
    console.log(detailList);
    
    
    let orderValues = [
      orders.order_total_amount,
      orders.addr,
      orders.detail_addr,
      orders.post_no,
      orders.user_id,
      orders.pay_code,
      orders.phone_no,
      orders.name
    ];

    let orderNo = -1;
    await query('insertOrder',orderValues)
    .then(()=>query('getOrderNum', orders.pay_code)
    .then(result=>orderNo=result.orderNo));
    
    //console.log('주문번호 : '+ orderNo);
    insertDetail(orderNo,detailList,res)    
    
  });

  async function insertDetail(orderNum,itemList,response){

        // 동적 쿼리 생성
        let insertOrderDetail = "INSERT INTO order_detail (prod_no, prod_name, prod_cnt, price, order_amount, prod_img, order_no) VALUES ";

    let OrderDetailValues = [];

    itemList.forEach((item, index) => {
    insertOrderDetail += ' (?, ?, ?, ?, ?, ?)';
    if (index < itemList.length - 1) {
    insertOrderDetail += ', ';
    }

    OrderDetailValues.push(
    item.prod_no,
    item.prod_name,
    item.prod_cnt,
    item.price,
    item.order_amount,
    item.prod_img,
    orderNum
    );
    });


    try {
    const result = await query2(insertOrderDetail, OrderDetailValues);
    response.send({ message: "Data inserted", result });
    } catch (err) {
    console.error(err);
    response.status(500).send({ error: "Database insertion error" });
    }
  }
module.exports = router;