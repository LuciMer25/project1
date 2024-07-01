const express = require('express');
const router = express.Router();
const query = require('../../../mysql/index.js');
const mysql = require('../../../mysql/main/order/myindex.js');
const sql = require('../../../mysql/sql.js');
router.use(express.json());

    router.post("/", async (req,res)=>{
    
    const userId = req.body.userId; 
    console.log(userId);
        let cartList = (await query('cartList',userId));
        //console.log(cartList)
        res.send(cartList);
        
    });

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

  module.exports = router;