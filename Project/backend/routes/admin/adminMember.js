const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');
const schedule = require('node-schedule');


  router.get("/memberList", async (req, res) => {
    let list = await query("memberList");
    res.send({ list });
  });

  router.get("/memberCount", async (req, res) => {
    let count = await query("memberCount");
    count = count[0].cnt;
    res.send({ count });
  });

  router.put('/memberUpdateDate/:id', async (req, res) => {
    const userId = req.params.id;
  
    if (userId === 'admin') {
      await query("adminUpdateDate", [userId]);
      console.log(`관리자 접속일자 업데이트: ${userId}`);
    } else {
      await query("memberUpdateDate", [userId]);
      console.log(`접속일자 업데이트: ${userId}`);
  
      let userResp = await query("getUserResp", [userId]);
      userResp = userResp[0].user_resp;
      console.log(`권한: ${userResp}`);
  
      if (userResp !== 'admin') {
        schedule.scheduleJob(new Date(Date.now() + 10000), async () => {
          console.log(`회원ID : ${userId}`);
          try {
            await query("memberUpdateResp", [userId]);
            console.log("휴면계정으로 변경");
          } catch (err) {
            console.log(`스케쥴링 안됨`, err);
          }
        });
      }
    }
  })

module.exports = router;