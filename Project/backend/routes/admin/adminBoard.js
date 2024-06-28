const express = require('express');
const router = express.Router();
const query = require('../../mysql/index.js');

  router.get("/qnaList", async (req, res) => {
    let list = await query("qnaList");
    res.send({ list });
  });
  
  router.get("/inquiryList", async (req, res) => {
    let list = await query("inquiryList");
    res.send({ list });
  });

  router.get("/qnaAllList", async (req, res) => {
    let list = await query("qnaAllList");
    res.send({ list });
  });
  
  router.get("/inquiryAllList", async (req, res) => {
    let list = await query("inquiryAllList");
    res.send({ list });
  });

  router.get("/adminQnaInfo/:no", async (req, res) => {
    const no = req.params.no
    let list = await query("adminQnaInfo", [no]);
    res.send({ list });
  })

  router.post("/qnaReplyInsert", async (req, res) => {
    const { qnaNo, content} = req.body
    let result = await query("qnaReplyInsert", [content, qnaNo]);
    res.send(result);
  })

  router.put("/qnaStateUpdate", async (req, res) => {
    const { qnaNo } = req.body
    let result = await query("qnaStateUpdate", [qnaNo]);
    res.send(result)
  })

  // router.put("/qnaReplyUpdate", async (req, res) => {
  //   const { qnaNo, content } = req.body;
  //   let result = await query("qnaReplyUpdate", [content, qnaNo]);
  //   res.send(result);
  // });
  router.put("/qnaReplyUpdate", async (req, res) => {
    const { qnaNo, content } = req.body;
    try {
        let result = await query("qnaReplyUpdate", [content, qnaNo]);
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


module.exports = router;