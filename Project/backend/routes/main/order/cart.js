const express = require('express');
const router = express.Router();
const query = require('../../../mysql/index.js');
const mysql = require('../../../mysql/main/order/myindex.js');
const sql = require('../../../mysql/sql.js');
router.use(express.json());

// 로그 미들웨어 추가
router.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
});



    router.post("/", async (req,res)=>{
    
    const user_id = req.body.user_id; 
    console.log(user_id);
        let cartList = (await query('cartList',user_id));
        //console.log(cartList)
        res.send(cartList);
        
    });
    // 단건삭제
    router.delete("/:cartNo", async (req,res)=>{
    
        const cartNo = req.params.cartNo; 
        
            let result = (await query('deleteItem',cartNo));
            //console.log(cartList)
            res.send(result);
            
        });
    
    router.put('/batchUpdate', async (req, res) => {
        const items = req.body.items; // 업데이트할 항목들
        const batchUpdateQuery = sql.batchUpdate(items);
        console.log(batchUpdateQuery);
        try {
            await mysql.cartQuery(batchUpdateQuery);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating cart items');
        }
    });
    
    router.post('/batchDelete', async (req, res) => {
        try {
            console.log("Request body:", req.body); // 전체 요청 본문 출력
            const cartNos = req.body.cartNos; // 삭제할 cart_no 목록
            console.log("Received cartNos for deletion:", cartNos);
            if (!Array.isArray(cartNos) || cartNos.length === 0) {
                return res.status(400).send('Invalid request data');
            }
    
            await mysql.multiquery('deleteItems', cartNos); // 다건 삭제 쿼리 실행
            res.sendStatus(200);
        } catch (error) {
            console.error("Error in batchDelete:", error);
            res.status(500).send('Error deleting cart items');
        }
    });
    
  module.exports = router;