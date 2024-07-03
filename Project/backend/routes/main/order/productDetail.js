const express = require('express');
const router = express.Router();
const mysql = require('../../../mysql/main/order/myindex.js');
router.get("/:no", async (req,res)=>{
    const no = req.params.no;
    console.log('상품번호 : '+no);
    let product = (await mysql.query('getProductInfo',no));
    res.send(product);
  });
router.post("/:action", async(req,res)=>{
  const { action } = req.params;
  const { user_id, prod_no } = req.body;

  console.log(action);
  console.log(user_id,prod_no);

  switch(action) {
    case 'addCart':
      let {prod_cnt} = req.body;
      console.log(prod_cnt);
      await mysql.query('addCart', [prod_cnt, prod_no, user_id]).then(result=>res.send(result));
      break;
      
      case 'addWish':
        const toggleResult = await toggleWishlist(user_id, prod_no);
        res.status(200).json(toggleResult);
        break;
      
        default:
        res.status(400).json({ message: "Invalid action" });
        break;
  }
  
  

});

const toggleWishlist = async (userId, prodNo) => {
    try {
        await mysql.query('startTransaction');

        const deleteResult = await query('deleteWish', [userId, prodNo]);
        
        let result = 'removed';
        if (deleteResult.affectedRows === 0) {
            await query('insertWish', [userId, prodNo]);
            result = 'added';
        }
        
        await mysql.query('commit');
        return { result };
    } catch (err) {
        await mysql.query('rollback');
        console.error('Transaction error:', err);
        throw err;
    }
};

  module.exports = router;