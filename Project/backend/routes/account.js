const express = require('express');
const router = express.Router();
const mysql = require('../mysql/index');
router.get("/", async (req,res)=>{
  
    //if(req.cookies && req.cookies.account){
    // if(req.session.is_logined){
    //   const member = JSON.parse({userid: req.session.userid});
    //   console.log(member);
    //   return res.send(member);
    // }
    // //}
    // else{res.send(401);}
    let member = await mysql.query('getLoginMemberInfo','test');
    res.send(member);
    
  });



  module.exports = router;