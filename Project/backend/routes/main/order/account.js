const express = require('express');
const router = express.Router();
const query = require('../../../mysql/index');
router.get("/", async (req,res)=>{
  const userId = req.query.user_id;

    let member = (await query('getLoginMemberInfo',userId));
    console.log(member)
    res.send(member);
    
  });



  module.exports = router;